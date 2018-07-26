pragma solidity ^0.4.19;

import "./KycAttester.sol";

contract KycAttesterManager {
    KycAttester internal kycAttester;

    constructor(address _contractAddress) public {
        setKycAttester(_contractAddress);
    }

    function setKycAttester(address _contractAddress) public {
        kycAttester = KycAttester(_contractAddress);
    }
    function getKycAttester() public view returns (address) {
        return kycAttester;
    }

    function add(address _attesterId) public {
        kycAttester.add(_attesterId);
    }

    function remove(address _attesterId) public {
        kycAttester.remove(_attesterId);
    }
    
    function size() public view returns (uint) {
        return kycAttester.size();
    }
    
    function contains(address _key) public view returns (bool) {
        return kycAttester.contains(_key);
    }
    
    function getByKey(address _key) public view returns (bool) {
        return kycAttester.getByKey(_key);
    }
    
    function getByIndex(uint _index) public view returns (bool) {
        return kycAttester.getByIndex(_index);
    }

    function getKeys() public view returns (address[]) {
        return kycAttester.getKeys();
    }
}