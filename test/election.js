const Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {
    it("Initializes two candidates", () => {
        return Election.deployed().then((i) => { return i.candidateCount() }).then((count) => { assert.equal(count, 2) })
    })
    it("Initializes candidates with correct values", () => {
        return Election.deployed().then((i) => {
            electionInstance = i;
            return electionInstance.candidates(0)
        })
            .then((candidate) => {
                assert.equal(candidate[0], 0, "Contains InCorrect Id");
                assert.equal(candidate[1], "C1", "Contains InCorrect Name");
                assert.equal(candidate[2], 0, "Contains InCorrect Vote Count")
                return electionInstance.candidates(1)
            }).then((candidate) => {
                assert.equal(candidate[0], 1, "Contains InCorrect Id");
                assert.equal(candidate[1], "C2", "Contains InCorrect Name");
                assert.equal(candidate[2], 0, "Contains InCorrect Vote Count")
            })
    })
    it("allows a voter to cast a vote", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          candidateId = 1;
          return electionInstance.vote(candidateId, { from: accounts[0] });
        }).then(function(receipt) {
          assert.equal(receipt.logs.length, 1, "an event was triggered");
          assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
          assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct");
          return electionInstance.voters(accounts[0]);
        }).then(function(voted) {
          assert(voted, "the voter was marked as voted");
          return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "increments the candidate's vote count");
        })
      });
    
      it("throws an exception for invalid candiates", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          return electionInstance.vote(99, { from: accounts[1] })
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then(function(candidate1) {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then(function(candidate2) {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
        });
      });
    
      it("throws an exception for double voting", function() {
        return Election.deployed().then(function(instance) {
          electionInstance = instance;
          candidateId = 1;
          electionInstance.vote(candidateId, { from: accounts[1] });
          return electionInstance.candidates(candidateId);
        }).then(function(candidate) {
          var voteCount = candidate[2];
          assert.equal(voteCount, 1, "accepts first vote");
          // Try to vote again
          return electionInstance.vote(candidateId, { from: accounts[1] });
        }).then(assert.fail).catch(function(error) {
          assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
          return electionInstance.candidates(1);
        }).then(function(candidate1) {
          var voteCount = candidate1[2];
          assert.equal(voteCount, 2, "candidate 1 did not receive any votes");
          return electionInstance.candidates(2);
        }).then(function(candidate2) {
          var voteCount = candidate2[2];
          assert.equal(voteCount, 0, "candidate 2 did not receive any votes");
        });
      });

})