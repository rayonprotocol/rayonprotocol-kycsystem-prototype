const KycAttesterMap = artifacts.require('./KycAttesterMap.sol');
const KycAttesterManager = artifacts.require('./KycAttesterManager.sol');

contract('KycAttesterManager', function (accounts) {
    var kycAttesterMapContract;
    var kycAttesterManagerContract;
    before('setup contract for each test', async () => {
        kycAttesterMapContract = await KycAttesterMap.new();
        kycAttesterManagerContract = await KycAttesterManager.new(kycAttesterMapContract.address);

        console.log('kycAttesterMap is deployed: ' + kycAttesterMapContract.address);
        var kycAttesterMapContractOwner = await kycAttesterMapContract.owner()
        console.log('kycAttesterMap\'s owner: ' + kycAttesterMapContractOwner);
        assert.equal(kycAttesterMapContractOwner, accounts[0]);

        console.log('kycAttesterManager is deployed: ' + kycAttesterManagerContract.address);
        var kycAttesterManagerContractOwner = await kycAttesterManagerContract.owner()
        console.log('kycAttesterManager\'s owner: ' + kycAttesterManagerContractOwner);
        assert.equal(kycAttesterManagerContractOwner, accounts[0]);

        // console.log('Account list contains ' + accounts.length + ' entries');
        // var i;
        // for (i = 0; i < accounts.length; i++) {
        //     console.log(' ' + i + ': ' + accounts[i]);
        // }
    })

    // it("Check empty list", async () => {
    //     assert.equal(await kycAttesterManagerContract.size(), 0);
    //     var i;
    //     for (i = 0; i < accounts.length; i++) {
    //         assert.equal(await kycAttesterManagerContract.contains(accounts[i]), false);
    //     }
    // });

    // it("Add first account", async () => {
    //     var account1 = accounts[0];
    //     await kycAttesterManagerContract.add(account1);

    //     assert.equal(await kycAttesterManagerContract.size(), 1);
    //     assert.equal(await kycAttesterManagerContract.contains(account1), true);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account1), true);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 1);
    //     assert.equal(attesterIds[0], account1);
    // });
    // it("Remove first account", async () => {
    //     var account1 = accounts[0];
    //     assert.equal(await kycAttesterManagerContract.size(), 1);
    //     assert.equal(await kycAttesterManagerContract.contains(account1), true);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account1), true);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 1);

    //     await kycAttesterManagerContract.remove(account1);

    //     assert.equal(await kycAttesterManagerContract.size(), 0);
    //     assert.equal(await kycAttesterManagerContract.contains(account1), false);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account1), false);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 0);
    // });
    // it("Add first & second accounts", async () => {
    //     var account1 = accounts[0];
    //     var account2 = accounts[1];

    //     // add first account
    //     await kycAttesterManagerContract.add(account1);

    //     assert.equal(await kycAttesterManagerContract.size(), 1);
    //     assert.equal(await kycAttesterManagerContract.contains(account1), true);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account1), true);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 1);
    //     assert.equal(attesterIds[0], account1);

    //     // add second account
    //     await kycAttesterManagerContract.add(account2);

    //     assert.equal(await kycAttesterManagerContract.size(), 2);
    //     assert.equal(await kycAttesterManagerContract.contains(account2), true);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account2), true);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 2);
    //     assert.equal(attesterIds[0], account1);
    //     assert.equal(attesterIds[1], account2);

    //     // add second account again
    //     await kycAttesterManagerContract.add(account2);

    //     assert.equal(await kycAttesterManagerContract.size(), 2);
    //     assert.equal(await kycAttesterManagerContract.contains(account2), true);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account2), true);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 2);
    //     assert.equal(attesterIds[0], account1);
    //     assert.equal(attesterIds[1], account2);
    // });
    // it("Add third & fourth accounts", async () => {
    //     var account1 = accounts[0];
    //     var account2 = accounts[1];
    //     var account3 = accounts[2];
    //     var account4 = accounts[3];

    //     // add third account
    //     await kycAttesterManagerContract.add(account3);

    //     assert.equal(await kycAttesterManagerContract.size(), 3);
    //     assert.equal(await kycAttesterManagerContract.contains(account3), true);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account3), true);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 3);
    //     assert.equal(attesterIds[0], account1);
    //     assert.equal(attesterIds[1], account2);
    //     assert.equal(attesterIds[2], account3);

    //     // add fourth account
    //     await kycAttesterManagerContract.add(account4);

    //     assert.equal(await kycAttesterManagerContract.size(), 4);
    //     assert.equal(await kycAttesterManagerContract.contains(account4), true);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account4), true);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 4);
    //     assert.equal(attesterIds[0], account1);
    //     assert.equal(attesterIds[1], account2);
    //     assert.equal(attesterIds[2], account3);
    //     assert.equal(attesterIds[3], account4);
    // });
    // it("remove accounts", async () => {
    //     var account1 = accounts[0];
    //     var account2 = accounts[1];
    //     var account3 = accounts[2];
    //     var account4 = accounts[3];

    //     // remove second account
    //     await kycAttesterManagerContract.remove(account2);

    //     assert.equal(await kycAttesterManagerContract.size(), 3);
    //     assert.equal(await kycAttesterManagerContract.contains(account2), false);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account2), false);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 3);
    //     assert.equal(attesterIds[0], account1);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(attesterIds[0]), true);
    //     assert.equal(attesterIds[1], account4);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(attesterIds[1]), true);
    //     assert.equal(attesterIds[2], account3);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(attesterIds[2]), true);

    //     // remove first account
    //     await kycAttesterManagerContract.remove(account1);

    //     assert.equal(await kycAttesterManagerContract.size(), 2);
    //     assert.equal(await kycAttesterManagerContract.contains(account1), false);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(account1), false);
    //     var attesterIds = await kycAttesterManagerContract.getAttesterIds();
    //     assert.equal(attesterIds.length, 2);
    //     assert.equal(attesterIds[0], account3);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(attesterIds[0]), true);
    //     assert.equal(attesterIds[1], account4);
    //     assert.equal(await kycAttesterManagerContract.getByAttesterId(attesterIds[1]), true);
    // });

    it('transfer kycAttesterMap\'s ownership to kycAttesterManager', async () => {
        console.log('Request to change kycAttesterMap\'s owner to kycAttesterManager');
        await kycAttesterMapContract.transferOwnership(kycAttesterManagerContract.address); // transfer to pending owner
        kycAttesterMapContractOwner = await kycAttesterMapContract.owner()
        assert.equal(kycAttesterMapContractOwner, accounts[0]);
        kycAttesterMapContractPendingOwner = await kycAttesterMapContract.pendingOwner()
        console.log('kycAttesterMap\'s pending owner: ' + kycAttesterMapContractPendingOwner);
        assert.equal(kycAttesterMapContractPendingOwner, kycAttesterManagerContract.address);

        console.log('Claim kycAttesterMap\'s owner from pendding onwer \'kycAttesterManager\'');
        await kycAttesterManagerContract.claimOwnershipContract(kycAttesterMapContract.address); // transfer claimed
        kycAttesterMapContractOwner = await kycAttesterMapContract.owner();
        console.log('kycAttesterMap\'s owner: ' + kycAttesterMapContractOwner);
        assert.equal(kycAttesterMapContractOwner, kycAttesterManagerContract.address);
        console.log('Changed kycAttesterMap\'s owner: ' + kycAttesterMapContractOwner);
    });
    it('transfer ownership to deployed account', async () => {
        console.log('Change kycAttesterMap\'s owner to account[0]');
        await kycAttesterManagerContract.reclaimContract(kycAttesterMapContract.address); // transfer to pending owner
        kycAttesterMapContractOwner = await kycAttesterMapContract.owner();
        assert.equal(kycAttesterMapContractOwner, kycAttesterManagerContract.address);
        kycAttesterMapContractPendingOwner = await kycAttesterMapContract.pendingOwner()
        console.log('kycAttesterMap\'s pending owner: ' + kycAttesterMapContractPendingOwner);
        assert.equal(kycAttesterMapContractPendingOwner, accounts[0]);

        await kycAttesterMapContract.claimOwnership(); // transfer claimed
        kycAttesterMapContractOwner = await kycAttesterMapContract.owner();
        console.log('kycAttesterMap\'s owner: ' + kycAttesterMapContractOwner);
        assert.equal(kycAttesterMapContractOwner, accounts[0]);
        console.log('Changed kycAttesterMap\'s owner: ' + kycAttesterMapContractOwner);
    })
    it('transfer kycAttesterMap\'s ownership to kycAttesterManager again', async () => {
        console.log('Request to change kycAttesterMap\'s owner to kycAttesterManager');
        await kycAttesterMapContract.transferOwnership(kycAttesterManagerContract.address); // transfer to pending owner
        kycAttesterMapContractOwner = await kycAttesterMapContract.owner();
        assert.equal(kycAttesterMapContractOwner, accounts[0]);
        kycAttesterMapContractPendingOwner = await kycAttesterMapContract.pendingOwner()
        console.log('kycAttesterMap\'s pending owner: ' + kycAttesterMapContractPendingOwner);
        assert.equal(kycAttesterMapContractPendingOwner, kycAttesterManagerContract.address);

        console.log('Claim kycAttesterMap\'s owner from pendding onwer \'kycAttesterManager\'');
        await kycAttesterManagerContract.claimOwnershipContract(kycAttesterMapContract.address); // transfer claimed
        kycAttesterMapContractOwner = await kycAttesterMapContract.owner();
        console.log('kycAttesterMap\'s owner: ' + kycAttesterMapContractOwner);
        assert.equal(kycAttesterMapContractOwner, kycAttesterManagerContract.address);
        console.log('Changed kycAttesterMap\'s owner: ' + kycAttesterMapContractOwner);
    });
    after('after test, kill all contracts', async () => {
        var kycAttesterManagerContractOwner = await kycAttesterManagerContract.owner();
        console.log('kycAttesterManager\'s owner: ' + kycAttesterManagerContractOwner);
        var kycAttesterMapContractOwner1 = await kycAttesterMapContract.owner();
        console.log('kycAttesterMap\'s owner before kill kycAttesterManager: ' + kycAttesterMapContractOwner1);

        // kill kycAttesterManagerContract
        console.log('kill kycAttesterManagerContract');
        await kycAttesterManagerContract.kill();
        var kycAttesterMapContractOwner2 = await kycAttesterMapContract.owner();
        console.log('kycAttesterMap\'s owner after kill kycAttesterManager: ' + kycAttesterMapContractOwner2);
        assert.equal(kycAttesterMapContractOwner1, kycAttesterMapContractOwner2);

        await kycAttesterMapContract.claimOwnership(); // transfer claimed
        var kycAttesterMapContractOwner3 = await kycAttesterMapContract.owner();
        console.log('kycAttesterMap\'s owner after claimed ownership: ' + kycAttesterMapContractOwner3);
        assert.equal(kycAttesterManagerContractOwner, kycAttesterMapContractOwner3);

        // after kill kycAttesterManagerContract, call any function
        try {
            await kycAttesterManagerContract.owner();
            assert.failed("function call of killed contract must be failed")
        } catch (err) {
            assert(true, "function call of killed contract must be failed");
        }

        // kill kycAttesterMapContract
        console.log('kill kycAttesterMapContract');
        await kycAttesterMapContract.kill();

        // after kill kycAttesterMapContract, call any function
        try {
            await kycAttesterMapContract.owner();
            assert.failed("function call of killed contract must be failed")
        } catch (err) {
            assert(true, "function call of killed contract must be failed");
        }

    })

})