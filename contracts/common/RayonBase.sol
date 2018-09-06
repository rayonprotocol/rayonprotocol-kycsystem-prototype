pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Claimable.sol";
import "openzeppelin-solidity/contracts/ownership/HasNoContracts.sol";
import "openzeppelin-solidity/contracts/ownership/HasNoEther.sol";

contract RayonBase is Claimable, HasNoContracts, HasNoEther {
    uint16 public version;
    string public name;

    constructor(string _name, uint16 _version) public {
        
    }


    function claimOwnershipContract(address _contractAddr) public onlyOwner {
        require(_contractAddr != address(0));
        Claimable contractInst = Claimable(_contractAddr);
        contractInst.claimOwnership();
    }

    function reclaimOwnershipContract(address _contractAddr) public onlyOwner {
        require(_contractAddr != address(0));
        Ownable contractInst = Ownable(_contractAddr);
        contractInst.transferOwnership(owner);
    }

    function kill() external onlyOwner {
        selfdestruct(owner);
    }
}