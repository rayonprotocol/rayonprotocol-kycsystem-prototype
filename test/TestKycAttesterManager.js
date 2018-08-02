const KycAttesterMap = artifacts.require('./KycAttesterMap.sol');
const KycAttesterManager = artifacts.require('./KycAttesterManager.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

var kycAttesterMap;
var kycAttesterManager;
contract('KycAttesterManager', function (accounts) {
    const admin = accounts[0];
    const attester1 = accounts[1];
    const attester2 = accounts[2];
    const guest = accounts[3];

    before(async function () {
        kycAttesterMap = await KycAttesterMap.new({ from: admin });
        console.log('kycAttesterMap is deployed: ' + kycAttesterMap.address);
        kycAttesterManager = await KycAttesterManager.new(kycAttesterMap.address, { from: admin });
        console.log('kycAttesterManager is deployed: ' + kycAttesterManager.address);
    })

    describe('transfer ownership', function () {
        it('before trasfer ownership', async function () {
            await kycAttesterManager.size({ from: admin }).should.be.rejectedWith(/revert/);
            await kycAttesterMap.size({ from: admin }).should.be.fulfilled;
        })
        it('transfer and claim ownership', async function () {
            await kycAttesterMap.transferOwnership(kycAttesterManager.address, { from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), admin);
            assert.equal(await kycAttesterMap.pendingOwner({ from: admin }), kycAttesterManager.address);

            await kycAttesterManager.claimOwnershipContract(kycAttesterMap.address, { from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), kycAttesterManager.address);
        })
        it('after trasfer ownership', async function () {
            await kycAttesterManager.size({ from: admin }).should.be.fulfilled;
            await kycAttesterMap.size({ from: admin }).should.be.rejectedWith(/revert/);
        })
    })
    describe('reclaim ownership', function () {
        it('before reclaim ownership', async function () {
            await kycAttesterManager.size({ from: admin }).should.be.fulfilled;
            await kycAttesterMap.size({ from: admin }).should.be.rejectedWith(/revert/);
        })
        it('reclaim ownership', async function () {
            await kycAttesterManager.reclaimOwnershipContract(kycAttesterMap.address, { from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), kycAttesterManager.address);
            assert.equal(await kycAttesterMap.pendingOwner({ from: admin }), admin);

            await kycAttesterMap.claimOwnership({ from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), admin);
        })
        it('after reclaim ownership', async function () {
            await kycAttesterManager.size({ from: admin }).should.be.rejectedWith(/revert/);
            await kycAttesterMap.size({ from: admin }).should.be.fulfilled;
        })
    })
    describe('transfer ownership again to execute test', function () {
        it('before trasfer ownership', async function () {
            await kycAttesterManager.size({ from: admin }).should.be.rejectedWith(/revert/);
            await kycAttesterMap.size({ from: admin }).should.be.fulfilled;
        })
        it('transfer and claim ownership', async function () {
            await kycAttesterMap.transferOwnership(kycAttesterManager.address, { from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), admin);
            assert.equal(await kycAttesterMap.pendingOwner({ from: admin }), kycAttesterManager.address);

            await kycAttesterManager.claimOwnershipContract(kycAttesterMap.address, { from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), kycAttesterManager.address);
        })
        it('after trasfer ownership', async function () {
            await kycAttesterManager.size({ from: admin }).should.be.fulfilled;
            await kycAttesterMap.size({ from: admin }).should.be.rejectedWith(/revert/);
        })
    })

    describe('check empty attester list', function () {
        it('size of list', async function () {
            assert.equal(await kycAttesterManager.size({ from: admin }), 0);
            assert.equal((await kycAttesterManager.getAttesterIds({ from: admin })).length, 0);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManager.contains(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManager.contains(attester2, { from: admin }), false);
        })
    })
    describe('add attester1 to list', function () {
        it('call add function', async function () {
            await kycAttesterManager.add(attester1, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManager.size({ from: admin }), 1);
            assert.equal((await kycAttesterManager.getAttesterIds({ from: admin })).length, 1);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManager.contains(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByAttesterId(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByIndex(0, { from: admin }), true);
            assert.equal(await kycAttesterManager.contains(attester2, { from: admin }), false);
            assert.equal(await kycAttesterManager.getByAttesterId(attester2, { from: admin }), false);
            await kycAttesterMap.getByIndex(1, { from: admin }).should.be.rejectedWith(/revert/);
        })
    })
    describe('add attester1 to list again', function () {
        it('call add function', async function () {
            await kycAttesterManager.add(attester1, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManager.size({ from: admin }), 1);
            assert.equal((await kycAttesterManager.getAttesterIds({ from: admin })).length, 1);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManager.contains(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByAttesterId(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByIndex(0, { from: admin }), true);
            assert.equal(await kycAttesterManager.contains(attester2, { from: admin }), false);
            assert.equal(await kycAttesterManager.getByAttesterId(attester2, { from: admin }), false);
            await kycAttesterMap.getByIndex(1, { from: admin }).should.be.rejectedWith(/revert/);
        })
    })
    describe('remove attester1 from list', function () {
        it('call remove function', async function () {
            await kycAttesterManager.remove(attester1, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManager.size({ from: admin }), 0);
            assert.equal((await kycAttesterManager.getAttesterIds({ from: admin })).length, 0);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManager.contains(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManager.getByAttesterId(attester1, { from: admin }), false);
            await kycAttesterMap.getByIndex(0, { from: admin }).should.be.rejectedWith(/revert/);
            assert.equal(await kycAttesterManager.contains(attester2, { from: admin }), false);
            assert.equal(await kycAttesterManager.getByAttesterId(attester2, { from: admin }), false);
            await kycAttesterMap.getByIndex(1, { from: admin }).should.be.rejectedWith(/revert/);
        })
    })
    describe('remove attester1 from list again', function () {
        it('call remove function', async function () {
            await kycAttesterManager.remove(attester1, { from: admin }).should.be.rejectedWith(/revert/);
        })
    })
    describe('add attester1 & attester2 to list', function () {
        it('call add function', async function () {
            await kycAttesterManager.add(attester1, { from: admin }).should.be.fulfilled;
            await kycAttesterManager.add(attester2, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManager.size({ from: admin }), 2);
            assert.equal((await kycAttesterManager.getAttesterIds({ from: admin })).length, 2);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManager.contains(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByAttesterId(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByIndex(0, { from: admin }), true);
            assert.equal(await kycAttesterManager.contains(attester2, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByAttesterId(attester2, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByIndex(1, { from: admin }), true);
        })
    })
    describe('remove attester1 from list', function () {
        it('call remove function', async function () {
            await kycAttesterManager.remove(attester1, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManager.size({ from: admin }), 1);
            assert.equal((await kycAttesterManager.getAttesterIds({ from: admin })).length, 1);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManager.contains(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManager.getByAttesterId(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManager.getByIndex(0, { from: admin }), true);
            assert.equal(await kycAttesterManager.contains(attester2, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByAttesterId(attester2, { from: admin }), true);
            await kycAttesterMap.getByIndex(1, { from: admin }).should.be.rejectedWith(/revert/);
        })
    })
    describe('remove attester2 from list', function () {
        it('call remove function', async function () {
            await kycAttesterManager.remove(attester2, { from: admin }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await kycAttesterManager.size({ from: admin }), 0);
            assert.equal((await kycAttesterManager.getAttesterIds({ from: admin })).length, 0);
        })
        it('attesters', async function () {
            assert.equal(await kycAttesterManager.contains(attester1, { from: admin }), false);
            assert.equal(await kycAttesterManager.getByAttesterId(attester1, { from: admin }), false);
            await kycAttesterMap.getByIndex(0, { from: admin }).should.be.rejectedWith(/revert/);
            assert.equal(await kycAttesterManager.contains(attester2, { from: admin }), false);
            assert.equal(await kycAttesterManager.getByAttesterId(attester2, { from: admin }), false);
            await kycAttesterMap.getByIndex(1, { from: admin }).should.be.rejectedWith(/revert/);
        })
    })

    describe('check function permissions', function () {
        it('function calls from admin', async function () {
            await kycAttesterManager.owner({ from: admin }).should.be.fulfilled;
            await kycAttesterManager.pendingOwner({ from: admin }).should.be.fulfilled;
            await kycAttesterManager.add(attester1, { from: admin }).should.be.fulfilled;
            await kycAttesterManager.size({ from: admin }).should.be.fulfilled;
            await kycAttesterManager.contains(attester1, { from: admin }).should.be.fulfilled;
            await kycAttesterManager.getByAttesterId(attester1, { from: admin }).should.be.fulfilled;
            await kycAttesterManager.getByIndex(0, { from: admin }).should.be.fulfilled;
            await kycAttesterManager.getAttesterIds({ from: admin }).should.be.fulfilled;
            await kycAttesterManager.remove(attester1, { from: admin }).should.be.fulfilled;
        })
        it('function calls from guest', async function () {
            await kycAttesterManager.owner({ from: guest }).should.be.fulfilled;
            await kycAttesterManager.pendingOwner({ from: guest }).should.be.fulfilled;
            await kycAttesterManager.add(attester1, { from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManager.size({ from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManager.contains(attester1, { from: guest }).should.be.fulfilled;
            await kycAttesterManager.getByAttesterId(attester1, { from: guest }).should.be.fulfilled;
            await kycAttesterManager.getByIndex(0, { from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManager.getAttesterIds({ from: guest }).should.be.rejectedWith(/revert/);
            await kycAttesterManager.remove(attester1, { from: guest }).should.be.rejectedWith(/revert/);
        })
    })


    describe('change to new kycAttesterManager with previous kybAttesterMap', function () {
        it('add attesters to kybAttesterMap', async function () {
            await kycAttesterManager.add(attester1, { from: admin }).should.be.fulfilled;
            await kycAttesterManager.add(attester2, { from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterManager.size({ from: admin }), 2);
            assert.equal(await kycAttesterManager.getByAttesterId(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByAttesterId(attester2, { from: admin }), true);
        })
        it('kill only kycAttesterManager', async function () {
            await kycAttesterManager.kill({ from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), kycAttesterManager.address);
            assert.equal(await kycAttesterMap.pendingOwner({ from: admin }), admin);

            await kycAttesterMap.claimOwnership({ from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), admin);
        })
        it('deploy new kycAttesterManager with previous kycAttesterMap', async function () {
            kycAttesterManager = await KycAttesterManager.new(kycAttesterMap.address, { from: admin });
            console.log('new kycAttesterManager is deployed: ' + kycAttesterManager.address);
        })
        it('transfer and claim ownership', async function () {
            await kycAttesterMap.transferOwnership(kycAttesterManager.address, { from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), admin);
            assert.equal(await kycAttesterMap.pendingOwner({ from: admin }), kycAttesterManager.address);

            await kycAttesterManager.claimOwnershipContract(kycAttesterMap.address, { from: admin }).should.be.fulfilled;
            assert.equal(await kycAttesterMap.owner({ from: admin }), kycAttesterManager.address);
        })
        it('check kycAttesterMap\'s data', async function () {
            assert.equal(await kycAttesterManager.size({ from: admin }), 2);
            assert.equal(await kycAttesterManager.getByAttesterId(attester1, { from: admin }), true);
            assert.equal(await kycAttesterManager.getByAttesterId(attester2, { from: admin }), true);
        })
    })

    after(async function () {
        // kill kycAttesterManager
        await kycAttesterManager.kill({ from: admin }).should.be.fulfilled;
        assert.equal(await kycAttesterMap.owner({ from: admin }), kycAttesterManager.address);
        assert.equal(await kycAttesterMap.pendingOwner({ from: admin }), admin);

        await kycAttesterMap.claimOwnership({ from: admin }).should.be.fulfilled;
        assert.equal(await kycAttesterMap.owner({ from: admin }), admin);

        // check if kycAttesterManager is killed
        await kycAttesterManager.owner({ from: admin }).should.be.rejectedWith(Error);

        // kill kycAttesterMapContract
        await kycAttesterMap.kill({ from: admin }).should.be.fulfilled;

        // check if kycAttesterMap is killed
        await kycAttesterMap.owner({ from: admin }).should.be.rejectedWith(Error);
    })
});