pragma solidity ^0.4.19;

import "./RayonBase.sol";
import "./AddressToBoolIterableMap.sol";

contract KycAttesterMap is RayonBase, AddressToBoolIterableMap {
    // Event defination
    event KycAttesterAdded(address indexed attesterId);
    event KycAttesterRemoved(address indexed attesterId);

    function add(address _attesterId) public onlyOwner {
        super._add(_attesterId, true);
        emit KycAttesterAdded(_attesterId);
    }

    function remove(address _attesterId) public onlyOwner {
        super._remove(_attesterId);
        emit KycAttesterRemoved(_attesterId);
    }
    
    function size() public view onlyOwner returns (uint) {
        return super._size();
    }
    
    function contains(address _attesterId) public view returns (bool) {
        return super._contains(_attesterId);
    }
    
    function getByAttesterId(address _attesterId) public view returns (bool) {
        return super._getByKey(_attesterId);
    }
    
    function getByIndex(uint _index) public view onlyOwner returns (bool) {
        return super._getByIndex(_index);
    }

    function getAttesterIds() public view onlyOwner returns (address[]) {
        return super._getKeys();
    }

    // inherited
    function kill() external onlyOwner {
        selfdestruct(owner);
    }
}