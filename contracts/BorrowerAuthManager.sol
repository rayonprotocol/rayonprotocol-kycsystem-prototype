pragma solidity ^0.4.19;

import "./BorrowerAuthMap.sol";

contract BorrowerAuthManager {
    BorrowerAuthMap internal borrowerAuthMap;

    // event definition

    constructor(address _contractAddress) public {
        setBorrowerAuthMap(_contractAddress);
    }

    function setBorrowerAuthMap(address _contractAddress) public {
        borrowerAuthMap = BorrowerAuthMap(_contractAddress);
        // TODO : emit event
    }
    function getBorrowerAuthMap() public view returns (address) {
        return borrowerAuthMap;
    }

    function addBorrowerAuth(address kycAttesterId, bytes32 borrowerAuthIdHash, uint8 v, bytes32 r, bytes32 s) public returns (bool) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, borrowerAuthIdHash));
        address signedAddress = ecrecover(prefixedHash, v, r, s);

        if(kycAttesterId == signedAddress){ // signatures are matched
            borrowerAuthMap.add(msg.sender, borrowerAuthIdHash);
            return true;
        }else{ // unmatched signatures
            return false;
        }
        // TODO : emit event
    }

    function size() public view returns (uint) {
        return borrowerAuthMap.size();
    }
    
    function contains(address _key) public view returns (bool) {
        return borrowerAuthMap.contains(_key);
    }
    
    function getBorrowerAuthByAddress(address borrower) public view returns (bytes32) {
        return borrowerAuthMap.getByKey(borrower);
    }

    function getBorrowerAuthByIndex(uint _index) public view returns (bytes32) {
        return borrowerAuthMap.getByIndex(_index);
    }

    function getBorrowers() public view returns (address[]) {
        return borrowerAuthMap.getKeys();
    }
}