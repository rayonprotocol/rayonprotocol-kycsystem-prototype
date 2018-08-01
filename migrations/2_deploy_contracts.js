const KycAttesterMap = artifacts.require('./KycAttesterMap.sol')
const KycAttesterManager = artifacts.require('./KycAttesterManager.sol')
const BorrowerAuthMap = artifacts.require('./BorrowerAuthMap.sol')
const BorrowerAuthManager = artifacts.require('./BorrowerAuthManager.sol')
const TestAddressToBoolIterableMap = artifacts.require('./TestAddressToBoolIterableMap.sol')

module.exports = function (deployer) {
  // KycAttesterManager
  deployer.deploy(KycAttesterMap).then(function () {
    deployer.deploy(KycAttesterManager, KycAttesterMap.address);
  });
  // BorrowerAuthManager
  deployer.deploy(BorrowerAuthMap).then(function () {
    deployer.deploy(BorrowerAuthManager, BorrowerAuthMap.address);
  });
  
  // TestAddressToBoolIterableMap
  deployer.deploy(TestAddressToBoolIterableMap);
}
