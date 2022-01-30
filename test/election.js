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

})