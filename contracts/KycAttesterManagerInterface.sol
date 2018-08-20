pragma solidity ^0.4.19;

import "./rayonprotocol-common-contract/RayonBase.sol";

contract KycAttesterManagerInterface is RayonBase {
    function add(address _attesterId) public;
    function remove(address _attesterId) public;
    function size() public view returns (uint);
    function contains(address _attesterId) public view returns (bool);
    function getByAttesterId(address _attesterId) public view returns (bool);
    function getByIndex(uint _index) public view returns (bool);
    function getAttesterIds() public view returns (address[]);
}