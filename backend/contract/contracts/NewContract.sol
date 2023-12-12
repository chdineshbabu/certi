// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

contract StringStorage {
    string[] public strings;

    event StringStored(string value);

    function storeString(string memory value) public {
        strings.push(value);
        emit StringStored(value);
    }
    function getStringCount() public view returns (uint256) {
        return strings.length;
    }
    function getStringByIndex(uint256 index) public view returns (string memory) {
        require(index < strings.length, "Index out of bounds");
        return strings[index];
    }
}
