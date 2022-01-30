// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    // candidateCount
    uint256 public candidateCount = 0;

    // Candiate Model
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
    mapping(uint256 => Candidate) public candidates;

    //constructor
    constructor() public {
        createCandidate("C1");
        createCandidate("C2");
    }

    function createCandidate(string memory name) public {
        candidates[candidateCount] = Candidate(candidateCount, name, 0);
        candidateCount++;
    }
}
