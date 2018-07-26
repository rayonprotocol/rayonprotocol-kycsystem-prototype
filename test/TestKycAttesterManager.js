const KycAttester = artifacts.require('./KycAttester.sol');
const KycAttesterManager = artifacts.require('./KycAttesterManager.sol');

contract('KycAttester', function (accounts) {
    var kycAttesterManagerContract;
    before('setup contract for each test', async () => {
        var kycAttesterContract = await KycAttester.deployed();
        kycAttesterManagerContract = await KycAttester.deployed(kycAttesterContract.address);

        console.log('KycAttester is deployed: ' + kycAttesterManagerContract.address);
        console.log('KycAttesterManager is deployed: ' + kycAttesterManagerContract.address);
        console.log('Account list contains ' + accounts.length + ' entries');
        var i;
        for (i = 0; i < accounts.length; i++) {
            console.log(' ' + i + ': ' + accounts[i]);
        }
    })

    it("Check empty list", async () => {
        assert.equal(await kycAttesterManagerContract.size(), 0);
        var i;
        for (i = 0; i < accounts.length; i++) {
            assert.equal(await kycAttesterManagerContract.contains(accounts[i]), false);
        }
    });

    it("Add first account", async () => {
        var account1 = accounts[0];
        await kycAttesterManagerContract.add(account1);

        assert.equal(await kycAttesterManagerContract.size(), 1);
        assert.equal(await kycAttesterManagerContract.contains(account1), true);
        assert.equal(await kycAttesterManagerContract.getByKey(account1), true);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 1);
        assert.equal(attesterIds[0], account1);
    });
    it("Remove first account", async () => {
        var account1 = accounts[0];
        assert.equal(await kycAttesterManagerContract.size(), 1);
        assert.equal(await kycAttesterManagerContract.contains(account1), true);
        assert.equal(await kycAttesterManagerContract.getByKey(account1), true);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 1);
        
        await kycAttesterManagerContract.remove(account1);
        
        assert.equal(await kycAttesterManagerContract.size(), 0);
        assert.equal(await kycAttesterManagerContract.contains(account1), false);
        assert.equal(await kycAttesterManagerContract.getByKey(account1), false);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 0);
    });
    it("Add first & second accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];

        // add first account
        await kycAttesterManagerContract.add(account1);

        assert.equal(await kycAttesterManagerContract.size(), 1);
        assert.equal(await kycAttesterManagerContract.contains(account1), true);
        assert.equal(await kycAttesterManagerContract.getByKey(account1), true);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 1);
        assert.equal(attesterIds[0], account1);

        // add second account
        await kycAttesterManagerContract.add(account2);

        assert.equal(await kycAttesterManagerContract.size(), 2);
        assert.equal(await kycAttesterManagerContract.contains(account2), true);
        assert.equal(await kycAttesterManagerContract.getByKey(account2), true);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 2);
        assert.equal(attesterIds[0], account1);
        assert.equal(attesterIds[1], account2);

        // add second account again
        await kycAttesterManagerContract.add(account2);

        assert.equal(await kycAttesterManagerContract.size(), 2);
        assert.equal(await kycAttesterManagerContract.contains(account2), true);
        assert.equal(await kycAttesterManagerContract.getByKey(account2), true);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 2);
        assert.equal(attesterIds[0], account1);
        assert.equal(attesterIds[1], account2);
    });
    it("Add third & fourth accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];
        var account3 = accounts[2];
        var account4 = accounts[3];

        // add third account
        await kycAttesterManagerContract.add(account3);

        assert.equal(await kycAttesterManagerContract.size(), 3);
        assert.equal(await kycAttesterManagerContract.contains(account3), true);
        assert.equal(await kycAttesterManagerContract.getByKey(account3), true);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 3);
        assert.equal(attesterIds[0], account1);
        assert.equal(attesterIds[1], account2);
        assert.equal(attesterIds[2], account3);

        // add fourth account
        await kycAttesterManagerContract.add(account4);

        assert.equal(await kycAttesterManagerContract.size(), 4);
        assert.equal(await kycAttesterManagerContract.contains(account4), true);
        assert.equal(await kycAttesterManagerContract.getByKey(account4), true);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 4);
        assert.equal(attesterIds[0], account1);
        assert.equal(attesterIds[1], account2);
        assert.equal(attesterIds[2], account3);
        assert.equal(attesterIds[3], account4);
    });
    it("remove accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];
        var account3 = accounts[2];
        var account4 = accounts[3];

        // remove second account
        await kycAttesterManagerContract.remove(account2);

        assert.equal(await kycAttesterManagerContract.size(), 3);
        assert.equal(await kycAttesterManagerContract.contains(account2), false);
        assert.equal(await kycAttesterManagerContract.getByKey(account2), false);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 3);
        assert.equal(attesterIds[0], account1);
        assert.equal(await kycAttesterManagerContract.getByKey(attesterIds[0]), true);
        assert.equal(attesterIds[1], account4);
        assert.equal(await kycAttesterManagerContract.getByKey(attesterIds[1]), true);
        assert.equal(attesterIds[2], account3);
        assert.equal(await kycAttesterManagerContract.getByKey(attesterIds[2]), true);

        // remove first account
        await kycAttesterManagerContract.remove(account1);

        assert.equal(await kycAttesterManagerContract.size(), 2);
        assert.equal(await kycAttesterManagerContract.contains(account1), false);
        assert.equal(await kycAttesterManagerContract.getByKey(account1), false);
        var attesterIds = await kycAttesterManagerContract.getKeys();
        assert.equal(attesterIds.length, 2);
        assert.equal(attesterIds[0], account3);
        assert.equal(await kycAttesterManagerContract.getByKey(attesterIds[0]), true);
        assert.equal(attesterIds[1], account4);
        assert.equal(await kycAttesterManagerContract.getByKey(attesterIds[1]), true);
    });
})