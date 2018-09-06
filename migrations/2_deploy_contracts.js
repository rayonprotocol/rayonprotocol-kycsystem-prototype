const KycAttesterManager = artifacts.require('./KycAttesterManager.sol');
const BorrowerAuthManager = artifacts.require('./BorrowerAuthManager.sol');
const Proxy = artifacts.require('./common/Proxy.sol');

module.exports = function (deployer) {
	// KycAttesterManager
	deployer.deploy(KycAttesterManager).then(function () {
		deployer.deploy(Proxy, KycAttesterManager.address);
	});
	// BorrowerAuthManager
	deployer.deploy(BorrowerAuthManager).then(function () {
		deployer.deploy(Proxy, BorrowerAuthManager.address);
	});
}
