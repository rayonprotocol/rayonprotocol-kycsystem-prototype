pragma solidity ^0.4.19;

import "./RayonBase.sol";
import "./AddressToBytes32IterableMap.sol";

contract BorrowerAuthMap is RayonBase, AddressToBytes32IterableMap {
    // Event defination
    event BorrowerAuthAdded(address indexed borrower);
    event BorrowerAuthRemoved(address indexed borrower);

    function add(address _borrower, bytes32 _authHash) public onlyOwner {
        super._add(_borrower, _authHash);
        emit BorrowerAuthAdded(_borrower);
    }

    function remove(address _borrower) public onlyOwner {
        super._remove(_borrower);
        emit BorrowerAuthRemoved(_borrower);
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

    function getAddresses() public view onlyOwner returns (address[]) {
        return super._getKeys();
    }

    // inherited
    function kill() external onlyOwner {
        selfdestruct(owner);
    }
}