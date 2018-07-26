const AddressBoolIterableMapImpl = artifacts.require('./AddressBoolIterableMapImpl.sol')
const KycAttesterManager = artifacts.require('./KycAttesterManager.sol')
const AddressStringIterableMapImpl = artifacts.require('./AddressStringIterableMapImpl.sol')
const BorrowerAuthManager = artifacts.require('./BorrowerAuthManager.sol')

module.exports = function (deployer) {
  // KycAttesterManager
  deployer.deploy(AddressBoolIterableMapImpl).then(function () {
    deployer.deploy(KycAttesterManager, AddressBoolIterableMapImpl.address);
  });
  // BorrowerAuthManager
  deployer.deploy(AddressStringIterableMapImpl).then(function () {
    deployer.deploy(BorrowerAuthManager, AddressStringIterableMapImpl.address);
  });
}
