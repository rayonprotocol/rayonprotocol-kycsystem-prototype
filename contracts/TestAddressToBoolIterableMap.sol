pragma solidity ^0.4.19;

import "./AddressToBoolIterableMap.sol";

// Simple AddressToBoolIterableMap Contract for Test
contract TestAddressToBoolIterableMap is AddressToBoolIterableMap {
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