const KycAttester = artifacts.require('./KycAttester.sol')

module.exports = function (deployer) {
  var kycAttesterContract;
  deployer.deploy(KycAttester).then(function(){
    kycAttesterContract = KycAttester;
  });

//    deployer.deploy(TokenStorage, team1_address, team2_address, team3_address);
}
