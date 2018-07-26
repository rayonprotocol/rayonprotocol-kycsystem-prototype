pragma solidity ^0.4.19;

contract AddressBoolIterableMap {
    function add(address _key) public;
    function remove(address _key) public;
    function size() public view returns (uint);
    function contains(address _key) public view returns (bool);
    function getByKey(address _key) public view returns (bool);
    function getByIndex(uint _index) public view returns (bool);
    function getKeys() public view returns (address[]);
}