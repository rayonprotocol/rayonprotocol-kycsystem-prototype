pragma solidity ^0.4.19;

import "./AddressToBytes32IterableMap.sol";

// TODO: add authorization only for permitted account.
contract BorrowerAuthMap is AddressToBytes32IterableMap {
    function add(address _key, bytes32 _value) public {
        super._add(_key, _value);
    }

    function remove(address _key) public {
        super._remove(_key);
    }
    
    function size() public view returns (uint) {
        return super._size();
    }
    
    function contains(address _key) public view returns (bool) {
        return super._contains(_key);
    }
    
    function getByKey(address _key) public view returns (bytes32) {
        return super._getByKey(_key);
    }
    
    function getByIndex(uint _index) public view returns (bytes32) {
        return super._getByIndex(_index);
    }

    function getKeys() public view returns (address[]) {
        return super._getKeys();
    }
}