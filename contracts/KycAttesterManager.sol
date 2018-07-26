pragma solidity ^0.4.19;

import "./AddressBoolIterableMapImpl.sol";

contract KycAttesterManager {
    AddressBoolIterableMap internal kycAttesterMap;

    // Todo : onlyOwner needed

    constructor(address _contractAddress) public {
        setKycAttesterMap(_contractAddress);
    }

    function setKycAttesterMap(address _contractAddress) public {
        kycAttesterMap = AddressBoolIterableMapImpl(_contractAddress);
    }
    function getKycAttester() public view returns (address) {
        return kycAttesterMap;
    }

    function add(address _attesterId) public {
        kycAttesterMap.add(_attesterId, true);
    }

    function remove(address _attesterId) public {
        kycAttesterMap.remove(_attesterId);
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