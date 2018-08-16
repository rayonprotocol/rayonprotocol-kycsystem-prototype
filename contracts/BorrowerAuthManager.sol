pragma solidity ^0.4.19;

import "./rayonprotocol-common-contract/RayonBase.sol";
import "./BorrowerAuthMap.sol";

contract BorrowerAuthManager is RayonBase {
    BorrowerAuthMap public borrowerAuthMap;

    constructor(address _contractAddress) public {
        setBorrowerAuthMap(_contractAddress);
    }

    function setBorrowerAuthMap(address _contractAddress) public onlyOwner {
        require(_contractAddress != address(0));
        borrowerAuthMap = BorrowerAuthMap(_contractAddress);
    }

    function verifyAndAddBorrowerAuth(address kycAttesterId, bytes32 authHash, uint8 v, bytes32 r, bytes32 s) public {
        require(!contains(msg.sender)); // update not allowed

        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, authHash));
        address signedAddress = ecrecover(prefixedHash, v, r, s);

        require(kycAttesterId == signedAddress); // signature is verified
        borrowerAuthMap.add(msg.sender, authHash);
    }

    function remove() public pure {
        require(false); // remove not allowed
    }

    function size() public view onlyOwner returns (uint) {
        return borrowerAuthMap.size();
    }
    
    function contains(address _borrower) public view returns (bool) {
        return borrowerAuthMap.contains(_borrower);
    }
    
    function getBorrowerAuthByAddress(address _borrower) public view returns (bytes32) {
        return borrowerAuthMap.getByAddress(_borrower);
    }

    function getBorrowerAuthByIndex(uint _index) public view onlyOwner returns (bytes32) {
        return borrowerAuthMap.getByIndex(_index);
    }

    function getBorrowers() public view onlyOwner returns (address[]) {
        return borrowerAuthMap.getAddresses();
    }

    // inherited
    function kill() external onlyOwner {
        if(borrowerAuthMap.owner() == address(this)){
            super.reclaimOwnershipContract(address(borrowerAuthMap));
        }
        selfdestruct(owner);
    }
}