const BorrowerAuthMap = artifacts.require('./BorrowerAuthMap.sol');
const BorrowerAuthManager = artifacts.require('./BorrowerAuthManager.sol');

require('chai')
    .use(require('chai-as-promised'))
    .should();

var borrowerAuthMap;
var borrowerAuthManager;
contract('BorrowerAuthManager', function (accounts) {
    const admin = accounts[0];
    const borrower1 = accounts[1];
    const borrower2 = accounts[2];
    const guest = accounts[3];

    before(async function () {
        borrowerAuthMap = await BorrowerAuthMap.new({ from: admin });
        console.log('borrowerAuthMap is deployed: ' + borrowerAuthMap.address);
        borrowerAuthManager = await BorrowerAuthManager.new(borrowerAuthMap.address, { from: admin });
        console.log('borrowerAuthManager is deployed: ' + borrowerAuthManager.address);
    })

    describe('transfer ownership', function () {
        it('before trasfer ownership', async function () {
            await borrowerAuthManager.size({ from: admin }).should.be.rejectedWith(/revert/);
            await borrowerAuthMap.size({ from: admin }).should.be.fulfilled;
        })
        it('transfer and claim ownership', async function () {
            await borrowerAuthMap.transferOwnership(borrowerAuthManager.address, { from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), admin);
            assert.equal(await borrowerAuthMap.pendingOwner({ from: admin }), borrowerAuthManager.address);

            await borrowerAuthManager.claimOwnershipContract(borrowerAuthMap.address, { from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), borrowerAuthManager.address);
        })
        it('after trasfer ownership', async function () {
            await borrowerAuthManager.size({ from: admin }).should.be.fulfilled;
            await borrowerAuthMap.size({ from: admin }).should.be.rejectedWith(/revert/);
        })
    })
    describe('reclaim ownership', function () {
        it('before reclaim ownership', async function () {
            await borrowerAuthManager.size({ from: admin }).should.be.fulfilled;
            await borrowerAuthMap.size({ from: admin }).should.be.rejectedWith(/revert/);
        })
        it('reclaim ownership', async function () {
            await borrowerAuthManager.reclaimOwnershipContract(borrowerAuthMap.address, { from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), borrowerAuthManager.address);
            assert.equal(await borrowerAuthMap.pendingOwner({ from: admin }), admin);

            await borrowerAuthMap.claimOwnership({ from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), admin);
        })
        it('after reclaim ownership', async function () {
            await borrowerAuthManager.size({ from: admin }).should.be.rejectedWith(/revert/);
            await borrowerAuthMap.size({ from: admin }).should.be.fulfilled;
        })
    })
    describe('transfer ownership again to execute test', function () {
        it('before trasfer ownership', async function () {
            await borrowerAuthManager.size({ from: admin }).should.be.rejectedWith(/revert/);
            await borrowerAuthMap.size({ from: admin }).should.be.fulfilled;
        })
        it('transfer and claim ownership', async function () {
            await borrowerAuthMap.transferOwnership(borrowerAuthManager.address, { from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), admin);
            assert.equal(await borrowerAuthMap.pendingOwner({ from: admin }), borrowerAuthManager.address);

            await borrowerAuthManager.claimOwnershipContract(borrowerAuthMap.address, { from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), borrowerAuthManager.address);
        })
        it('after trasfer ownership', async function () {
            await borrowerAuthManager.size({ from: admin }).should.be.fulfilled;
            await borrowerAuthMap.size({ from: admin }).should.be.rejectedWith(/revert/);
        })
    })

    describe('check empty borrowerAuth list', function () {
        it('size of list', async function () {
            assert.equal(await borrowerAuthManager.size({ from: admin }), 0);
            assert.equal((await borrowerAuthManager.getBorrowers({ from: admin })).length, 0);
        })
        it('borrowerAuths', async function () {
            assert.equal(await borrowerAuthManager.contains(borrower1, { from: admin }), false);
            assert.equal(await borrowerAuthManager.contains(borrower2, { from: admin }), false);
        })
    })
    describe('verify and add borrower1\'s auth', function () {
        // verified signature of borrower1's auth
        const borrower = borrower1;
        const authId = "123456-1234567";
        const attesterId = "0x1a5232919693b2f3d5ec2a5e44ae925c1edd4c95";
        const authHash = "0x61d84b390cb579eead774b9cb3ad7288e8008200d0d381d7812cad2ca7ac9d5b";
        const v = "0x1b";
        const r = "0xb1389a1d49ab823329a5d02d09a49e2dedbf43438da44b92f7ca365e4c12489b";
        const s = "0x3858b4ec11f2325911301f577ba38a454d85a67bfc3c01b99502a8ac374a01b6";
        it('call verifyAndAddBorrowerAuth function', async function () {
            await borrowerAuthManager.verifyAndAddBorrowerAuth(attesterId, authHash, v, r, s, { from: borrower }).should.be.fulfilled;
        })
        it('size of list', async function () {
            assert.equal(await borrowerAuthManager.size({ from: admin }), 1);
            assert.equal((await borrowerAuthManager.getBorrowers({ from: admin })).length, 1);
        })
        it('borrowerAuth', async function () {
            assert.equal(await borrowerAuthManager.contains(borrower, { from: admin }), true);
            assert.equal(await borrowerAuthManager.getBorrowerAuthByAddress(borrower, { from: admin }), authHash);
            assert.equal(await borrowerAuthManager.getBorrowerAuthByIndex(0, { from: admin }), authHash);
        })
    })
    describe('verify and update borrower1\'s auth', function () {
        // another verified signature of borrower1's auth
        const borrower = borrower1;
        const authId = "654321-7654321";
        const attesterId = "0x1a5232919693b2f3d5ec2a5e44ae925c1edd4c95";
        const authHash = "0x417cd6c966111a972c6da5075daed761fb9dcd4ce552e3aec0a9351e38c0b625";
        const v = "0x1c";
        const r = "0xed633fe70df43b37ec1ba440bbd98769288a60400856717140ed7fb534070cb7";
        const s = "0x473d582a7e2524bfcbb226d02e10ce5b92409e7f4d83c94b8d34fe56499a9d1d";
        it('call verifyAndAddBorrowerAuth function', async function () {
            await borrowerAuthManager.verifyAndAddBorrowerAuth(attesterId, authHash, v, r, s, { from: borrower }).should.be.rejectedWith(/revert/);
        })
    })
    describe('try to remove borrower1\'s auth', function () {
        const borrower = borrower1;
        it('call remove function', async function () {
            await borrowerAuthManager.remove({ from: borrower }).should.be.rejectedWith(/revert/);
        })
        it('size of list', async function () {
            assert.equal(await borrowerAuthManager.size({ from: admin }), 1);
            assert.equal((await borrowerAuthManager.getBorrowers({ from: admin })).length, 1);
        })
    })
    describe('verify and add borrower2\'s auth', function () {
        // incorrect signature of borrower1's auth
        const borrower = borrower2;
        const authId = "111111-1111111";
        const attesterId = "0x1a5232919693b2f3d5ec2a5e44ae925c1edd4c95";
        const authHash = "0x1111111111111111111111111111111111111111111111111111111111111111";
        const v = "0x11";
        const r = "0x1111111111111111111111111111111111111111111111111111111111111111";
        const s = "0x1111111111111111111111111111111111111111111111111111111111111111";
        it('call verifyAndAddBorrowerAuth function', async function () {
            await borrowerAuthManager.verifyAndAddBorrowerAuth(attesterId, authHash, v, r, s, { from: borrower }).should.be.rejectedWith(/revert/);
        })
        it('size of list', async function () {
            assert.equal(await borrowerAuthManager.size({ from: admin }), 1);
            assert.equal((await borrowerAuthManager.getBorrowers({ from: admin })).length, 1);
        })
    })

    describe('check function permissions', function () {
        it('function calls from admin', async function () {
            await borrowerAuthManager.owner({ from: admin }).should.be.fulfilled;
            await borrowerAuthManager.pendingOwner({ from: admin }).should.be.fulfilled;
            await borrowerAuthManager.size({ from: admin }).should.be.fulfilled;
            await borrowerAuthManager.contains(borrower1, { from: admin }).should.be.fulfilled;
            await borrowerAuthManager.getBorrowerAuthByAddress(borrower1, { from: admin }).should.be.fulfilled;
            await borrowerAuthManager.getBorrowerAuthByIndex(0, { from: admin }).should.be.fulfilled;
            await borrowerAuthManager.getBorrowers({ from: admin }).should.be.fulfilled;
        })
        it('function calls from guest', async function () {
            await borrowerAuthManager.owner({ from: guest }).should.be.fulfilled;
            await borrowerAuthManager.pendingOwner({ from: guest }).should.be.fulfilled;
            await borrowerAuthManager.size({ from: guest }).should.be.rejectedWith(/revert/);
            await borrowerAuthManager.contains(borrower1, { from: guest }).should.be.fulfilled;
            await borrowerAuthManager.getBorrowerAuthByAddress(borrower1, { from: guest }).should.be.fulfilled;
            await borrowerAuthManager.getBorrowerAuthByIndex(0, { from: guest }).should.be.rejectedWith(/revert/);
            await borrowerAuthManager.getBorrowers({ from: guest }).should.be.rejectedWith(/revert/);
        })
    })

    describe('change to new borrowerAuthManager with previous borrowerAuthMap', function () {
        it('check size of list', async function () {
            assert.equal(await borrowerAuthManager.size({ from: admin }), 1);
        })
        it('kill only borrowerAuthManager', async function () {
            await borrowerAuthManager.kill({ from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), borrowerAuthManager.address);
            assert.equal(await borrowerAuthMap.pendingOwner({ from: admin }), admin);

            await borrowerAuthMap.claimOwnership({ from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), admin);
        })
        it('deploy new borrowerAuthManager with previous borrowerAuthMap', async function () {
            borrowerAuthManager = await BorrowerAuthManager.new(borrowerAuthMap.address, { from: admin });
            console.log('new borrowerAuthManager is deployed: ' + borrowerAuthManager.address);
        })
        it('transfer and claim ownership', async function () {
            await borrowerAuthMap.transferOwnership(borrowerAuthManager.address, { from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), admin);
            assert.equal(await borrowerAuthMap.pendingOwner({ from: admin }), borrowerAuthManager.address);

            await borrowerAuthManager.claimOwnershipContract(borrowerAuthMap.address, { from: admin }).should.be.fulfilled;
            assert.equal(await borrowerAuthMap.owner({ from: admin }), borrowerAuthManager.address);
        })
        it('check size of list', async function () {
            assert.equal(await borrowerAuthManager.size({ from: admin }), 1);
        })
    })

    after(async function () {
        // kill borrowerAuthManager
        await borrowerAuthManager.kill({ from: admin }).should.be.fulfilled;
        assert.equal(await borrowerAuthMap.owner({ from: admin }), borrowerAuthManager.address);
        assert.equal(await borrowerAuthMap.pendingOwner({ from: admin }), admin);

        await borrowerAuthMap.claimOwnership({ from: admin }).should.be.fulfilled;
        assert.equal(await borrowerAuthMap.owner({ from: admin }), admin);

        // check if borrowerAuthManager is killed
        await borrowerAuthManager.owner({ from: admin }).should.be.rejectedWith(Error);

        // kill borrowerAuthMapContract
        await borrowerAuthMap.kill({ from: admin }).should.be.fulfilled;

        // check if borrowerAuthMap is killed
        await borrowerAuthMap.owner({ from: admin }).should.be.rejectedWith(Error);
    })
})