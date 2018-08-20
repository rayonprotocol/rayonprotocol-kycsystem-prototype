const KycAttesterManager = artifacts.require('./KycAttesterManager.sol');
const KycAttesterManagerInterface = artifacts.require('./KycAttesterManagerInterface.sol');
const BorrowerAuthManager = artifacts.require('./BorrowerAuthManager.sol');
const BorrowerAuthManagerInterface = artifacts.require('./BorrowerAuthManagerInterface.sol');
const Proxy = artifacts.require('./rayonprotocol-common-contract/Proxy.sol');
const httpRequest = require('sync-request');

require('chai')
    .use(require('chai-as-promised'))
    .should();

var kycAttesterManager;
var kycAttesterManagerInterface;
var kycAttesterManagerProxy;
var borrowerAuthManager;
var borrowerAuthManagerInterface;
var borrowerAuthManagerProxy;
var kycAttesterId;
contract('KycAuthStory1', function (accounts) {
    const kycSystemUrl = 'http://localhost:8001/';
    const admin = accounts[0];
    const borrower1 = { address: accounts[1], authId: "861123-1311834" };
    const borrower2 = { address: accounts[2], authId: "920408-1671872" };
    const borrower3 = { address: accounts[3], authId: "860821-2982712" };
    const lender = accounts[4];

    before(async function () {
        // Contract deploy
        kycAttesterManager = await KycAttesterManager.new({ from: admin });
        console.log('kycAttesterManager is deployed: ' + kycAttesterManager.address);
        borrowerAuthManager = await BorrowerAuthManager.new({ from: admin });
        console.log('borrowerAuthManager is deployed: ' + borrowerAuthManager.address);

        // Proxy setting
        kycAttesterManagerProxy = await Proxy.new(kycAttesterManager.address, { from: admin });
        kycAttesterManagerInterface = await KycAttesterManagerInterface.at(kycAttesterManagerProxy.address, { from: admin });
        console.log('kycAttesterManagerInterface is deployed: ' + kycAttesterManagerInterface.address);
        borrowerAuthManagerProxy = await Proxy.new(borrowerAuthManager.address, { from: admin });
        borrowerAuthManagerInterface = await BorrowerAuthManagerInterface.at(borrowerAuthManagerProxy.address, { from: admin });
        console.log('borrowerAuthManagerInterface is deployed: ' + borrowerAuthManagerInterface.address);

        // account list
        console.log('Account list:');
        console.log('  admin: ' + admin);
        console.log('  borrower1: ' + borrower1.address);
        console.log('  borrower2: ' + borrower2.address);
        console.log('  borrower3: ' + borrower3.address);
        console.log('  lender: ' + lender);

        // check if kyc system is alive
        const httpResponse = httpRequest('GET', kycSystemUrl);
        assert.equal(httpResponse.statusCode, 200);
    })

    describe('Add KYC Attester ID to KycAttegerManager', function () {
        it("get attesterId from kyc system", async function () {
            const httpResponse = httpRequest('GET', kycSystemUrl);
            assert.equal(httpResponse.statusCode, 200);
            kycAttesterId = JSON.parse(httpResponse.body.toString('utf-8')).attesterId;
            assert.equal(kycAttesterId.startsWith('0x'), true);
        })
        it("add attesterId to kycAttesterManager", async function () {
            // console.log('KYC Attester ID2 : ' + kycAttesterId);
            await kycAttesterManagerInterface.add(kycAttesterId, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManagerInterface.size({ from: admin }), 1);
            assert.equal((await kycAttesterManagerInterface.getAttesterIds({ from: admin })).length, 1);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManagerInterface.contains(kycAttesterId, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(kycAttesterId, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByIndex(0, { from: admin }), true);
        })
    })
    describe('Store authentication signature of borrower1 to borrowerAuthManager', function () {
        const borrower = borrower1;
        var attesterId;
        var authHash;
        var v;
        var r;
        var s;
        it("authenticate and get signature of borrower1", async function () {
            const httpResponse = httpRequest('POST', kycSystemUrl + borrower.address, {
                json: { id: borrower.authId },
            });
            assert.equal(httpResponse.statusCode, 200);
            const httpResponseBody = JSON.parse(httpResponse.body.toString('utf-8'));
            assert.equal(httpResponseBody.attesterId, kycAttesterId);
            authHash = httpResponseBody.authHash;
            v = httpResponseBody.v;
            r = httpResponseBody.r;
            s = httpResponseBody.s;
        })
        it('call verifyAndAddBorrowerAuth function', async function () {
            await borrowerAuthManagerInterface.verifyAndAddBorrowerAuth(kycAttesterId, authHash, v, r, s, { from: borrower.address }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await borrowerAuthManagerInterface.size({ from: admin }), 1);
            assert.equal((await borrowerAuthManagerInterface.getBorrowers({ from: admin })).length, 1);
        })
        it('borrowerAuth', async function () {
            assert.equal(await borrowerAuthManagerInterface.contains(borrower.address, { from: admin }), true);
            assert.equal(await borrowerAuthManagerInterface.getByAddress(borrower.address, { from: admin }), authHash);
            assert.equal(await borrowerAuthManagerInterface.getByIndex(0, { from: admin }), authHash);
        })
    })
    describe('lender get authentication signature of borrower1', function () {
        const borrower = borrower1;
        it("get signature of borrower1\'s auth and compare", async function () {
            const authIdFromBorrower = borrower.authId;
            const authHashFromBorrower = web3.sha3(borrower.authId);
            const authHashFromContract = await borrowerAuthManagerInterface.getByAddress(borrower.address, { from: lender });
            assert.equal(authHashFromBorrower, authHashFromContract);
        })
    })
})