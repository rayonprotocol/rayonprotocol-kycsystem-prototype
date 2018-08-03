pragma solidity ^0.4.19;

import "./RayonBase.sol";
import "./KycAttesterMap.sol";

contract KycAttesterManager is RayonBase {
    KycAttesterMap public kycAttesterMap;

    constructor(address _contractAddress) public {
        setKycAttesterMap(_contractAddress);
    }

    function setKycAttesterMap(address _contractAddress) public onlyOwner {
        require(_contractAddress != address(0));
        kycAttesterMap = KycAttesterMap(_contractAddress);
    }

    function add(address _attesterId) public onlyOwner {
        kycAttesterMap.add(_attesterId);
    }

    function remove(address _attesterId) public onlyOwner {
        kycAttesterMap.remove(_attesterId);
    }
    
    function size() public view onlyOwner returns (uint) {
        return kycAttesterMap.size();
    }
    
    function contains(address _attesterId) public view returns (bool) {
        return kycAttesterMap.contains(_attesterId);
    }
    
    function getByAttesterId(address _attesterId) public view returns (bool) {
        return kycAttesterMap.getByAttesterId(_attesterId);
    }
    
    function getByIndex(uint _index) public view onlyOwner returns (bool) {
        return kycAttesterMap.getByIndex(_index);
    }

    function getAttesterIds() public view onlyOwner returns (address[]) {
        return kycAttesterMap.getAttesterIds();
    }

    // inherited
    function kill() external onlyOwner {
        if(kycAttesterMap.owner() == address(this)){
            super.reclaimOwnershipContract(address(kycAttesterMap));
        }
        selfdestruct(owner);
    }
}