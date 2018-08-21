const KycAttesterManager = artifacts.require('./KycAttesterManager.sol');
const KycAttesterManagerInterface = artifacts.require('./KycAttesterManagerInterface.sol');
const Proxy = artifacts.require('./rayonprotocol-common-contract/Proxy.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

var kycAttesterManager;
var kycAttesterManagerInterface;
var kycAttesterManagerProxy;
contract('KycAttesterManager', function (accounts) {
    const admin = accounts[0];
    const newAdmin = accounts[1];
    const attester1 = accounts[2];
    const attester2 = accounts[3];
    const guest = accounts[4];

    before(async function () {
        kycAttesterManager = await KycAttesterManager.new({ from: admin });
        console.log('kycAttesterManager is deployed: ' + kycAttesterManager.address);

        // Proxy setting
        kycAttesterManagerProxy = await Proxy.new(kycAttesterManager.address, { from: admin });
        kycAttesterManagerInterface = await KycAttesterManagerInterface.at(kycAttesterManagerProxy.address, { from: admin });
        console.log('kycAttesterManagerInterface is deployed: ' + kycAttesterManagerInterface.address);
    })

    describe('check empty attester list', function () {
        it('size of list', async function () {
            assert.equal(await kycAttesterManagerInterface.size({ from: admin }), 0);
            assert.equal((await kycAttesterManagerInterface.getAttesterIds({ from: admin })).length, 0);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManagerInterface.contains(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.contains(attester2, { from: admin }), false);
        })
    })
    describe('add attester1 to list', function () {
        it('call add function', async function () {
            await kycAttesterManagerInterface.add(attester1, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManagerInterface.size({ from: admin }), 1);
            assert.equal((await kycAttesterManagerInterface.getAttesterIds({ from: admin })).length, 1);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManagerInterface.contains(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByIndex(0, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.contains(attester2, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester2, { from: admin }), false);
        })
    })
    describe('add attester1 to list again', function () {
        it('call add function', async function () {
            await kycAttesterManagerInterface.add(attester1, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManagerInterface.size({ from: admin }), 1);
            assert.equal((await kycAttesterManagerInterface.getAttesterIds({ from: admin })).length, 1);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManagerInterface.contains(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByIndex(0, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.contains(attester2, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester2, { from: admin }), false);
        })
    })
    describe('remove attester1 from list', function () {
        it('call remove function', async function () {
            await kycAttesterManagerInterface.remove(attester1, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManagerInterface.size({ from: admin }), 0);
            assert.equal((await kycAttesterManagerInterface.getAttesterIds({ from: admin })).length, 0);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManagerInterface.contains(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.contains(attester2, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester2, { from: admin }), false);
        })
    })
    describe('remove attester1 from list again', function () {
        it('call remove function', async function () {
            await kycAttesterManagerInterface.remove(attester1, { from: admin }).should.be.rejectedWith(/revert/);
        })
    })
    describe('add attester1 & attester2 to list', function () {
        it('call add function', async function () {
            await kycAttesterManagerInterface.add(attester1, { from: admin }).should.be.fulfilled;
            await kycAttesterManagerInterface.add(attester2, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManagerInterface.size({ from: admin }), 2);
            assert.equal((await kycAttesterManagerInterface.getAttesterIds({ from: admin })).length, 2);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManagerInterface.contains(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByIndex(0, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.contains(attester2, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester2, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByIndex(1, { from: admin }), true);
        })
    })
    describe('remove attester1 from list', function () {
        it('call remove function', async function () {
            await kycAttesterManagerInterface.remove(attester1, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManagerInterface.size({ from: admin }), 1);
            assert.equal((await kycAttesterManagerInterface.getAttesterIds({ from: admin })).length, 1);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManagerInterface.contains(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.getByIndex(0, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.contains(attester2, { from: admin }), true);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester2, { from: admin }), true);
        })
    })
    describe('remove attester2 from list', function () {
        it('call remove function', async function () {
            await kycAttesterManagerInterface.remove(attester2, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManagerInterface.size({ from: admin }), 0);
            assert.equal((await kycAttesterManagerInterface.getAttesterIds({ from: admin })).length, 0);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManagerInterface.contains(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.contains(attester2, { from: admin }), false);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester2, { from: admin }), false);
        })
    })

    describe('check function permissions', function () {
        it('function calls from admin', async function () {
            await kycAttesterManagerInterface.owner({ from: admin }).should.be.fulfilled;
            await kycAttesterManagerInterface.pendingOwner({ from: admin }).should.be.fulfilled;
            await kycAttesterManagerInterface.add(attester1, { from: admin }).should.be.fulfilled;
            await kycAttesterManagerInterface.size({ from: admin }).should.be.fulfilled;
            await kycAttesterManagerInterface.contains(attester1, { from: admin }).should.be.fulfilled;
            await kycAttesterManagerInterface.getByAttesterId(attester1, { from: admin }).should.be.fulfilled;
            await kycAttesterManagerInterface.getByIndex(0, { from: admin }).should.be.fulfilled;
            await kycAttesterManagerInterface.getAttesterIds({ from: admin }).should.be.fulfilled;
            await kycAttesterManagerInterface.remove(attester1, { from: admin }).should.be.fulfilled;
        })
        it('function calls from guest', async function () {
            await kycAttesterManagerInterface.owner({ from: guest }).should.be.fulfilled;
            await kycAttesterManagerInterface.pendingOwner({ from: guest }).should.be.fulfilled;
            await kycAttesterManagerInterface.add(attester1, { from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManagerInterface.size({ from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManagerInterface.contains(attester1, { from: guest }).should.be.fulfilled;
            await kycAttesterManagerInterface.getByAttesterId(attester1, { from: guest }).should.be.fulfilled;
            await kycAttesterManagerInterface.getByIndex(0, { from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManagerInterface.getAttesterIds({ from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManagerInterface.remove(attester1, { from: guest }).should.be.rejectedWith(/revert/);
        })
    })
    describe('change admin and check function permissions', function () {
        it('transfer ownership to newAdmin', async function () {
            // transferOwnership -> to pendingOwner
            await kycAttesterManagerInterface.transferOwnership(newAdmin, { from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterManagerInterface.owner({ from: admin }), admin);
            assert.equal(await kycAttesterManagerInterface.pendingOwner({ from: admin }), newAdmin);

            // claimOwnership
            await kycAttesterManagerInterface.claimOwnership({ from: newAdmin }).should.be.fulfilled;
            assert.equal(await kycAttesterManagerInterface.owner({ from: newAdmin }), newAdmin);
            assert.equal(await kycAttesterManagerInterface.pendingOwner({ from: newAdmin }), 0);
        })
        it('function calls from admin', async function () {
            await kycAttesterManagerInterface.owner({ from: newAdmin }).should.be.fulfilled;
            await kycAttesterManagerInterface.pendingOwner({ from: newAdmin }).should.be.fulfilled;
            await kycAttesterManagerInterface.add(attester1, { from: newAdmin }).should.be.fulfilled;
            await kycAttesterManagerInterface.size({ from: newAdmin }).should.be.fulfilled;
            await kycAttesterManagerInterface.contains(attester1, { from: newAdmin }).should.be.fulfilled;
            await kycAttesterManagerInterface.getByAttesterId(attester1, { from: newAdmin }).should.be.fulfilled;
            await kycAttesterManagerInterface.getByIndex(0, { from: newAdmin }).should.be.fulfilled;
            await kycAttesterManagerInterface.getAttesterIds({ from: newAdmin }).should.be.fulfilled;
            await kycAttesterManagerInterface.remove(attester1, { from: newAdmin }).should.be.fulfilled;
        })
        it('function calls from guest', async function () {
            await kycAttesterManagerInterface.owner({ from: guest }).should.be.fulfilled;
            await kycAttesterManagerInterface.pendingOwner({ from: guest }).should.be.fulfilled;
            await kycAttesterManagerInterface.add(attester1, { from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManagerInterface.size({ from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManagerInterface.contains(attester1, { from: guest }).should.be.fulfilled;
            await kycAttesterManagerInterface.getByAttesterId(attester1, { from: guest }).should.be.fulfilled;
            await kycAttesterManagerInterface.getByIndex(0, { from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManagerInterface.getAttesterIds({ from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManagerInterface.remove(attester1, { from: guest }).should.be.rejectedWith(/revert/);
        })
    })
    
    describe('change to new kycAttesterManager', function () {
        it('add attesters to kycAttesterManager', async function () {
            await kycAttesterManagerInterface.add(attester1, { from: newAdmin }).should.be.fulfilled;
            await kycAttesterManagerInterface.add(attester2, { from: newAdmin }).should.be.fulfilled;
            assert.equal(await kycAttesterManagerInterface.size({ from: newAdmin }), 2);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester1, { from: newAdmin }), true);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester2, { from: newAdmin }), true);
        })
        it('kill only kycAttesterManager', async function () {
            await kycAttesterManager.kill({ from: admin }).should.be.fulfilled;

            // check if kycAttesterManager is killed
            await kycAttesterManager.size({ from: admin }).should.be.rejectedWith(Error);

            // but kycAttesterManagerInterface is working
            await kycAttesterManagerInterface.size({ from: newAdmin }).should.be.fulfilled;
        })
        it('deploy new kycAttesterManager', async function () {
            kycAttesterManager = await KycAttesterManager.new({ from: newAdmin });
            console.log('new kycAttesterManager is deployed: ' + kycAttesterManager.address);

            // change target contract of Proxy
            kycAttesterManagerProxy.setTargetAddress(kycAttesterManager.address, { from: newAdmin });
        })
        it('check kycAttesterManager\'s data', async function () {
            assert.equal(await kycAttesterManagerInterface.size({ from: newAdmin }), 2);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester1, { from: newAdmin }), true);
            assert.equal(await kycAttesterManagerInterface.getByAttesterId(attester2, { from: newAdmin }), true);
        })
    })

    after(async function () {
        // kill kycAttesterManagerInterface
        await kycAttesterManagerInterface.kill({ from: newAdmin }).should.be.fulfilled;

        // check if kycAttesterManagerInterface is killed
        await kycAttesterManagerInterface.owner({ from: admin }).should.be.rejectedWith(Error);
    })
});