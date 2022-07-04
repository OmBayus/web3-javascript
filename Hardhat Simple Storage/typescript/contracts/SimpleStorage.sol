// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage{

    uint256 public number;

    struct People{
        uint256 number;
        string name;
    }

    People[] public people;

    mapping(string=>uint256) public nameToNumber;

    function store (uint256 _number) public{
        number = _number;
    }

    function retrieve () public view returns(uint256){
        return number;
    }

    function addPerson(string memory _name,uint256 _number) public{
        People memory newPerson = People({number:_number,name:_name});
        people.push(newPerson);
        nameToNumber[_name] = _number;
    }
}