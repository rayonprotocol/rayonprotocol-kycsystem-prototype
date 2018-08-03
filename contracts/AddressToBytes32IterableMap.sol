pragma solidity ^0.4.19;

contract AddressToBytes32IterableMap {
    struct Entry{
        uint index; // index start 1 to list.length
        bytes32 value;
    }
    mapping(address => Entry) internal map;
    address[] internal list;

    function _add(address _key, bytes32 _value) internal {
        require(_key != address(0));
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
        require(_key != address(0));
        require(_contains(_key));
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
    
    function _getByKey(address _key) internal view returns (bytes32) {
        return map[_key].value;
    }
    
    function _getByIndex(uint _index) internal view returns (bytes32) {
        require(_index >= 0);
        require(_index < list.length);
        return map[list[_index]].value;
    }

    function _getKeys() internal view returns (address[]) {
        return list;
    }
}