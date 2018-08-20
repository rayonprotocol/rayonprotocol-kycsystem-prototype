pragma solidity ^0.4.19;

import "./rayonprotocol-common-contract/RayonBase.sol";

contract BorrowerAuthManagerInterface is RayonBase {
    function verifyAndAddBorrowerAuth(address kycAttesterId, bytes32 authHash, uint8 v, bytes32 r, bytes32 s) public;
    function remove(address _borrower) public;
    function size() public view returns (uint);
    function contains(address _borrower) public view returns (bool);
    function getByAddress(address _borrower) public view returns (bytes32);
    function getByIndex(uint _index) public view returns (bytes32);
    function getBorrowers() public view returns (address[]);
}