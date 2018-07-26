pragma solidity ^0.4.19;

contract KycAttester {
    struct EntryAttester{
        uint index; // index start 1 to list.length
        bool enabled;
    }
    mapping(address => EntryAttester) private attesters;
    address[] private list;

    function add(address _id) public {
        EntryAttester storage entry = attesters[_id];
        entry.enabled = true;
        if(entry.index > 0){ // entry exists
            // do nothing
            return;
        }else { // new entry
            entry.index = ++list.length;
            list[entry.index-1] = _id;
        }
    }

    function remove(address _id) public {
        EntryAttester storage entry = attesters[_id];
        if(entry.index == 0){ // entry not exist
            // do nothing
            return;
        }
        require(entry.index <= list.length);
        
        // Move an existing element into the vacated key slot.
        attesters[list[list.length-1]].index = entry.index;
        list[entry.index-1] = list[list.length-1];
        list.length--;
        delete attesters[_id];
    }
    
    function size() public view returns (uint) {
        return uint(list.length);
    }
    
    function contains(address _id) public view returns (bool) {
        return attesters[_id].index > 0;
    }
    
    function getIds() public view returns (address[]) {
        return list;
    }

    function getById(address _id) public view returns (bool) {
        return attesters[_id].enabled;
    }
    
    function getByIndex(uint _index) public view returns (bool) {
        require(_index >= 0);
        require(_index < list.length);
        return attesters[list[_index]].enabled;
    }
}