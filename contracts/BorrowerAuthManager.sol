pragma solidity ^0.4.23;

import "./BorrowerAuthManagerInterface.sol";
import "./AddressToBytes32IterableMap.sol";

contract BorrowerAuthManager is BorrowerAuthManagerInterface, AddressToBytes32IterableMap {
    // Event defination
    event BorrowerAuthAdded(address indexed borrower);
    event BorrowerAuthRemoved(address indexed borrower);

    function verifyAndAddBorrowerAuth(address kycAttesterId, bytes32 authHash, uint8 v, bytes32 r, bytes32 s) public {
        require(!contains(msg.sender)); // update not allowed

        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encodePacked(prefix, authHash));
        address signedAddress = ecrecover(prefixedHash, v, r, s);

        require(kycAttesterId == signedAddress); // signature is verified
        super._add(msg.sender, authHash);
        emit BorrowerAuthAdded(msg.sender);
    }

    function remove(address _borrower) public {
        require(false); // remove not allowed
        // emit BorrowerAuthRemoved(_borrower);
    }

    function size() public view onlyOwner returns (uint) {
        return super._size();
    }
    
    function contains(address _borrower) public view returns (bool) {
        return super._contains(_borrower);
    }
    
    function getByAddress(address _borrower) public view returns (bytes32) {
        return super._getByKey(_borrower);
    }

    function getByIndex(uint _index) public view onlyOwner returns (bytes32) {
        return super._getByIndex(_index);
    }

    function getBorrowers() public view onlyOwner returns (address[]) {
        return super._getKeys();
    }
}