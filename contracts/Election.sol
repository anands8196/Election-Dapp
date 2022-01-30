// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Election {
    string public candidate;

    //constructor

    constructor() public {
        Election1();
    }

    function Election1() public {
        candidate = "candidate1";
    }
}
