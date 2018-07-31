pragma solidity ^0.4.19;

import "./KycAttesterMap.sol";

contract KycAttesterManager {
    KycAttesterMap internal kycAttesterMap;

    // TODO : onlyOwner needed
    // event definition

    constructor(address _contractAddress) public {
        setKycAttesterMap(_contractAddress);
    }

    function setKycAttesterMap(address _contractAddress) public {
        kycAttesterMap = KycAttesterMap(_contractAddress);
        // TODO : emit event
    }
    function getKycAttester() public view returns (address) {
        return kycAttesterMap;
    }

    function add(address _attesterId) public {
        kycAttesterMap.add(_attesterId, true);
        // TODO : emit event
    }

    function remove(address _attesterId) public {
        kycAttesterMap.remove(_attesterId);
        // TODO : emit event
    }
    
    function size() public view returns (uint) {
        return kycAttesterMap.size();
    }
    
    function contains(address _key) public view returns (bool) {
        return kycAttesterMap.contains(_key);
    }
    
    function getByKey(address _key) public view returns (bool) {
        return kycAttesterMap.getByKey(_key);
    }
    
    function getByIndex(uint _index) public view returns (bool) {
        return kycAttesterMap.getByIndex(_index);
    }

    function getKeys() public view returns (address[]) {
        return kycAttesterMap.getKeys();
    }
}