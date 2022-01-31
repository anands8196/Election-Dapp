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

    mapping(address => bool) public voters;

    mapping(uint256 => Candidate) public candidates;
    // voted event
    event votedEvent(uint256 indexed _candidateId);

    //constructor
    constructor() public {
        createCandidate("C1");
        createCandidate("C2");
    }

    function createCandidate(string memory _name) private {
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
        candidateCount++;
    }

    function vote(uint256 _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);

        // require a valid candidate
        require(_candidateId >= 0 && _candidateId <= candidateCount - 1);
        // Record Voter
        voters[msg.sender] = true;
        // Update Candidate Vote Count
        candidates[_candidateId].voteCount++;
        // trigger voted event
        emit votedEvent(_candidateId);
    }
}
