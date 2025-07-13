// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter{
    uint256 public count;
    string public author;

    constructor() {
        count = 0;
        author = "Vinicius Nascimento";
    }

    function increment() public {
        count += 1;
    }

    function decrement() public {
        if (count > 0) {
            count -= 1;
        }
    }

    function reset() public {
        count = 0;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

} //fim do Counter