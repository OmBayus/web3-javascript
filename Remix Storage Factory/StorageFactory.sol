// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./SimpleStorage.sol";

contract StorageFactory{

    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorageContract() public{
        simpleStorageArray.push(new SimpleStorage());
    }

    function sfStore(uint256 _index,uint256 _number) public{
        simpleStorageArray[_index].store(_number);
    }

    function sfGet(uint256 _index) public view returns(uint256){
        return simpleStorageArray[_index].retrieve();
    }
}