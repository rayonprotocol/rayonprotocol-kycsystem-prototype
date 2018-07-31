pragma solidity ^0.4.19;

import "./AddressBoolIterableMapImpl.sol";

// Simple AddressBoolIterableMap Contract for Test
contract TestAddressBoolIterableMap is AddressBoolIterableMapImpl {
    function add(address _key, bool _value) public {
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
    
    function getByKey(address _key) public view returns (bool) {
        return super._getByKey(_key);
    }
    
    function getByIndex(uint _index) public view returns (bool) {
        return super._getByIndex(_index);
    }

    function getKeys() public view returns (address[]) {
        return super._getKeys();
    }
}