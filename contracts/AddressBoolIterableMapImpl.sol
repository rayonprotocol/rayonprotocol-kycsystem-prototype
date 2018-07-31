pragma solidity ^0.4.19;

import "./AddressBoolIterableMap.sol";

contract AddressBoolIterableMapImpl is AddressBoolIterableMap {
    struct Entry{
        uint index; // index start 1 to list.length
        bool value;
    }
    mapping(address => Entry) internal map;
    address[] internal list;

    function _add(address _key, bool _value) internal {
        Entry storage entry = map[_key];
        entry.value = _value;
        if(entry.index > 0){ // entry exists
            // do nothing
            return;
        }else { // new entry
            entry.index = ++list.length;
            list[entry.index-1] = _key;
        }
    }

    function _remove(address _key) internal {
        Entry storage entry = map[_key];
        if(entry.index == 0){ // entry not exist
            // do nothing
            return;
        }
        require(entry.index <= list.length);
        
        // Move an existing element into the vacated key slot.
        map[list[list.length-1]].index = entry.index;
        list[entry.index-1] = list[list.length-1];
        list.length--;
        delete map[_key];
    }
    
    function _size() internal view returns (uint) {
        return uint(list.length);
    }
    
    function _contains(address _key) internal view returns (bool) {
        return map[_key].index > 0;
    }
    
    function _getByKey(address _key) internal view returns (bool) {
        return map[_key].value;
    }
    
    function _getByIndex(uint _index) internal view returns (bool) {
        require(_index >= 0);
        require(_index < list.length);
        return map[list[_index]].value;
    }

    function _getKeys() internal view returns (address[]) {
        return list;
    }
}