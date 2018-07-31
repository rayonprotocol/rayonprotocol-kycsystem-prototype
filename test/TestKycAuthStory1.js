const AddressBoolIterableMapImpl = artifacts.require('./AddressBoolIterableMapImpl.sol');
const KycAttesterManager = artifacts.require('./KycAttesterManager.sol');
const AddressBytes32IterableMapImpl = artifacts.require('./AddressBytes32IterableMapImpl.sol');
const BorrowerAuthManager = artifacts.require('./BorrowerAuthManager.sol');
var http = require('http');

contract('KycAuthStory1', function (accounts) {
    var request = require('sync-request');
    var kycSystemUrl = 'http://localhost:3000/';
    var kycAttesterManagerContract;
    var borrowerAuthManagerContract;
    var kycAttesterId;
    var rayonAdminAccount;
    var borrowerAccount1;
    var borrowerAccount2;
    var borrowerAccount3;
    var lenderAccount;
    var borrowerAuthId1 = "861123-1311834";
    var borrowerAuthId2 = "920408-1671872";
    var borrowerAuthId3 = "860821-2982712";

    before('setup contract for each test', async () => {
        // Contract deploy
        var kycAttesterMapContract = await AddressBoolIterableMapImpl.new();
        kycAttesterManagerContract = await KycAttesterManager.new(kycAttesterMapContract.address);
        var borrowerAuthMapContract = await AddressBytes32IterableMapImpl.new();
        borrowerAuthManagerContract = await BorrowerAuthManager.new(borrowerAuthMapContract.address);

        console.log('kycAttesterMap is deployed: ' + kycAttesterMapContract.address);
        console.log('kycAttesterManager is deployed: ' + kycAttesterManagerContract.address);
        console.log('borrowerAuthMapContract is deployed: ' + borrowerAuthMapContract.address);
        console.log('borrowerAuthManagerContract is deployed: ' + borrowerAuthManagerContract.address);

        // Account setting
        rayonAdminAccount = accounts[0];
        borrowerAccount1 = accounts[1];
        borrowerAccount2 = accounts[2];
        borrowerAccount3 = accounts[3];
        lenderAccount = accounts[4];

        console.log('Account list:');
        console.log('  RayonAdmin: ' + rayonAdminAccount);
        console.log('  Borrower1: ' + borrowerAccount1);
        console.log('  Borrower2: ' + borrowerAccount2);
        console.log('  Borrower3: ' + borrowerAccount3);
        console.log('  lender: ' + lenderAccount);
    })

    it("Add KYC Attester ID to KycAttegerManager", async () => {
        var res = request('GET', kycSystemUrl);
        kycAttesterId = JSON.parse(res.body.toString('utf-8')).attesterId;
        console.log('KYC Attester ID : ' + kycAttesterId);

        await kycAttesterManagerContract.add(kycAttesterId, { from: rayonAdminAccount });
        console.log('Added to KycAttegerManager: ' + kycAttesterId);

        assert.equal(await kycAttesterManagerContract.size(), 1);
        assert.equal(await kycAttesterManagerContract.contains(kycAttesterId), true);
        assert.equal(await kycAttesterManagerContract.getByKey(kycAttesterId), true);
        var keys = await kycAttesterManagerContract.getKeys();
        assert.equal(keys.length, 1);
        assert.equal(keys[0], kycAttesterId);
    });
    it("Authentication & Store borrower1's auth id", async () => {
        var borrowerAccount = borrowerAccount1;
        var borrowerAuthId = borrowerAuthId1;

        var res = request('POST', kycSystemUrl + borrowerAccount, {
            json: { id: borrowerAuthId },
        });
        resBody = JSON.parse(res.body.toString('utf-8'));
        assert.equal(resBody.attesterId, kycAttesterId);

        console.log('KYC Sign infomation for \'' + borrowerAccount + '\'');
        console.log('   authId: ' + resBody.authId);
        console.log('   authHash: ' + resBody.authHash);
        console.log('   authSignature: ' + resBody.authSignature);
        console.log('   v: ' + resBody.v);
        console.log('   r: ' + resBody.r);
        console.log('   s: ' + resBody.s);

        await borrowerAuthManagerContract.addBorrowerAuth(resBody.attesterId, resBody.authHash, resBody.v, resBody.r, resBody.s, { from: borrowerAccount });
        assert.equal(await borrowerAuthManagerContract.size(), 1);
        assert.equal(await borrowerAuthManagerContract.contains(borrowerAccount), true);
        assert.equal(await borrowerAuthManagerContract.getBorrowerAuthByAddress(borrowerAccount), resBody.authHash);
        var keys = await borrowerAuthManagerContract.getBorrowers();
        assert.equal(keys.length, 1);
        assert.equal(keys[0], borrowerAccount);
    });
    it("Get borrower1's auth id and verify from lender", async () => {
        var borrowerAccount = borrowerAccount1;
        var borrowerAuthId = borrowerAuthId1;
        var borrowerAuthIdHash = web3.sha3(borrowerAuthId);

        var authIdHashFromContract = await borrowerAuthManagerContract.getBorrowerAuthByAddress(borrowerAccount1, { from: lenderAccount });
        assert.equal(authIdHashFromContract, borrowerAuthIdHash);
        console.log("Authentication hash value of borrower is matched '" + borrowerAuthIdHash + "'");
    });

})