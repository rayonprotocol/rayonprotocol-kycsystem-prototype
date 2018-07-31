pragma solidity ^0.4.19;

import "openzeppelin-solidity/contracts/ownership/Claimable.sol";
import "openzeppelin-solidity/contracts/ownership/HasNoContracts.sol";
import "openzeppelin-solidity/contracts/ownership/HasNoEther.sol";

contract RayonBasic is Claimable, HasNoContracts, HasNoEther {
    function claimOwnershipContract(address contractAddr) public {
        Claimable contractInst = Claimable(contractAddr);
        contractInst.claimOwnership();
    }
}