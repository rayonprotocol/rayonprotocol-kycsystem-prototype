const AddressBoolIterableMapImpl = artifacts.require('./AddressBoolIterableMapImpl.sol')
const KycAttester = artifacts.require('./KycAttester.sol')
const KycAttesterManager = artifacts.require('./KycAttesterManager.sol')

module.exports = function (deployer) {
  deployer.deploy(AddressBoolIterableMapImpl);
  deployer.deploy(KycAttester).then(function(){
    var kycAttesterContract = KycAttester;
    deployer.deploy(KycAttesterManager, kycAttesterContract.address);
  });
}
