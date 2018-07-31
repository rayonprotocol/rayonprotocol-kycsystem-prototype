pragma solidity ^0.4.19;

contract AddressBytes32IterableMap {
    function _add(address _key, bytes32 _value) internal;
    function _remove(address _key) internal;
    function _size() internal view returns (uint);
    function _contains(address _key) internal view returns (bool);
    function _getByKey(address _key) internal view returns (bytes32);
    function _getByIndex(uint _index) internal view returns (bytes32);
    function _getKeys() internal view returns (address[]);
}