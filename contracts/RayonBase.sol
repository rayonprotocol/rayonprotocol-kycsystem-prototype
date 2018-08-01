pragma solidity ^0.4.19;

import "openzeppelin-solidity/contracts/ownership/Claimable.sol";
import "openzeppelin-solidity/contracts/ownership/HasNoContracts.sol";
import "openzeppelin-solidity/contracts/ownership/HasNoEther.sol";

contract RayonBase is Claimable, HasNoContracts, HasNoEther {
    function claimOwnershipContract(address _contractAddr) public {
        Claimable contractInst = Claimable(_contractAddr);
        contractInst.claimOwnership();
    }

    function reclaimOwnershipContract(address _contractAddr) public {
        Ownable _contractInst = Ownable(_contractAddr);
        _contractInst.transferOwnership(owner);
    }

    function kill() external;
}