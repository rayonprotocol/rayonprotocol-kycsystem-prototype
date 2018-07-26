pragma solidity ^0.4.19;

contract AddressBytes32IterableMap {
    function add(address _key, bytes32 _value) public;
    function remove(address _key) public;
    function size() public view returns (uint);
    function contains(address _key) public view returns (bool);
    function getByKey(address _key) public view returns (bytes32);
    function getByIndex(uint _index) public view returns (bytes32);
    function getKeys() public view returns (address[]);
}