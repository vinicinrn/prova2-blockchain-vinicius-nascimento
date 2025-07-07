// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter{
    uint256 public count;

    constructor() {
        count = 0;
    }

    function increment() public {
        count += 1;
    }

    function decrement() public {
        if (count > 0) {
            count -= 1;
        }
    }

    function getCount() public view returns (uint256) {
        return count;
    }

} //fim do Counter