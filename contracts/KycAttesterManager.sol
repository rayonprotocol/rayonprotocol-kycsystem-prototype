pragma solidity ^0.4.23;

import "./KycAttesterManagerInterface.sol";
import "./AddressToBoolIterableMap.sol";

contract KycAttesterManager is KycAttesterManagerInterface, AddressToBoolIterableMap {
    // Event defination
    event LogKycAttesterAdded(address indexed attesterId);
    event LogKycAttesterRemoved(address indexed attesterId);

    function add(address _attesterId) public onlyOwner {
        super._add(_attesterId, true);
        emit LogKycAttesterAdded(_attesterId);
    }

    function remove(address _attesterId) public onlyOwner {
        super._remove(_attesterId);
        emit LogKycAttesterRemoved(_attesterId);
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
}