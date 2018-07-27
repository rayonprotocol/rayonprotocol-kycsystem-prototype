pragma solidity ^0.4.19;

import "./AddressBoolIterableMapImpl.sol";

// TODO: add authorization only for permitted account.
contract KycAttesterMap is AddressBoolIterableMapImpl {
    function add(address _key, bool _value) public {
        super.add(_key, _value);
    }

    function remove(address _key) public {
        super.remove(_key);
    }
    
    function size() public view returns (uint) {
        return super.size();
    }
    
    function contains(address _key) public view returns (bool) {
        return super.contains(_key);
    }
    
    function getByKey(address _key) public view returns (bool) {
        return super.getByKey(_key);
    }
    
    function getByIndex(uint _index) public view returns (bool) {
        return super.getByIndex(_index);
    }

    function getKeys() public view returns (address[]) {
        return super.getKeys();
    }
}