const Election = artifacts.require("./Election.sol");

contract("Election", function (accounts) {
    it("Initializes two candidates", function () {
        return Election.deployed().then((i) => { return i.candidateCount() }).then((count) => { assert.equal(count, 2) })
    })
})