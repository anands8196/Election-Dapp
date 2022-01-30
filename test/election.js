const Election = artifacts.require("./Election.sol");

contract("Election", (accounts) => {
    it("Initializes two candidates", () => {
        return Election.deployed().then((i) => { return i.candidateCount() }).then((count) => { assert.equal(count, 2) })
    })
})