const KycAttester = artifacts.require('./KycAttester.sol');

contract('KycAttester', function (accounts) {
    var kycAttesterContract;
    before('setup contract for each test', async () => {
        kycAttesterContract = await KycAttester.deployed();
        console.log('KycAttester is deployed: ' + kycAttesterContract.address);
        console.log('Account list contains ' + accounts.length + ' entries');
        var i;
        for (i = 0; i < accounts.length; i++) {
            console.log(' ' + i + ': ' + accounts[i]);
        }
    })

    it("Check empty list", async () => {
        assert.equal(await kycAttesterContract.size(), 0);
        var i;
        for (i = 0; i < accounts.length; i++) {
            assert.equal(await kycAttesterContract.contains(accounts[i]), false);
        }
    });

    it("Add first account", async () => {
        var account1 = accounts[0];
        await kycAttesterContract.add(account1);

        assert.equal(await kycAttesterContract.size(), 1);
        assert.equal(await kycAttesterContract.contains(account1), true);
        assert.equal(await kycAttesterContract.getById(account1), true);
        var attesterIds = await kycAttesterContract.getIds();
        assert.equal(attesterIds.length, 1);
        assert.equal(attesterIds[0], account1);
    });
    it("Remove first account", async () => {
        var account1 = accounts[0];
        assert.equal(await kycAttesterContract.size(), 1);
        assert.equal(await kycAttesterContract.contains(account1), true);
        assert.equal(await kycAttesterContract.getById(account1), true);
        var attesterIds = await kycAttesterContract.getIds();
        assert.equal(attesterIds.length, 1);
        
        await kycAttesterContract.remove(account1);
        
        assert.equal(await kycAttesterContract.size(), 0);
        assert.equal(await kycAttesterContract.contains(account1), false);
        assert.equal(await kycAttesterContract.getById(account1), false);
        var attesterIds = await kycAttesterContract.getIds();
        assert.equal(attesterIds.length, 0);
    });
    it("Add first & second accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];

        // add first account
        await kycAttesterContract.add(account1);

        assert.equal(await kycAttesterContract.size(), 1);
        assert.equal(await kycAttesterContract.contains(account1), true);
        assert.equal(await kycAttesterContract.getById(account1), true);
        var attesterIds = await kycAttesterContract.getIds();
        assert.equal(attesterIds.length, 1);
        assert.equal(attesterIds[0], account1);

        // add second account
        await kycAttesterContract.add(account2);

        assert.equal(await kycAttesterContract.size(), 2);
        assert.equal(await kycAttesterContract.contains(account2), true);
        assert.equal(await kycAttesterContract.getById(account2), true);
        var attesterIds = await kycAttesterContract.getIds();
        assert.equal(attesterIds.length, 2);
        assert.equal(attesterIds[0], account1);
        assert.equal(attesterIds[1], account2);

        // add second account again
        await kycAttesterContract.add(account2);

        assert.equal(await kycAttesterContract.size(), 2);
        assert.equal(await kycAttesterContract.contains(account2), true);
        assert.equal(await kycAttesterContract.getById(account2), true);
        var attesterIds = await kycAttesterContract.getIds();
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
        await kycAttesterContract.add(account3);

        assert.equal(await kycAttesterContract.size(), 3);
        assert.equal(await kycAttesterContract.contains(account3), true);
        assert.equal(await kycAttesterContract.getById(account3), true);
        var attesterIds = await kycAttesterContract.getIds();
        assert.equal(attesterIds.length, 3);
        assert.equal(attesterIds[0], account1);
        assert.equal(attesterIds[1], account2);
        assert.equal(attesterIds[2], account3);

        // add fourth account
        await kycAttesterContract.add(account4);

        assert.equal(await kycAttesterContract.size(), 4);
        assert.equal(await kycAttesterContract.contains(account4), true);
        assert.equal(await kycAttesterContract.getById(account4), true);
        var attesterIds = await kycAttesterContract.getIds();
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
        await kycAttesterContract.remove(account2);

        assert.equal(await kycAttesterContract.size(), 3);
        assert.equal(await kycAttesterContract.contains(account2), false);
        assert.equal(await kycAttesterContract.getById(account2), false);
        var attesterIds = await kycAttesterContract.getIds();
        assert.equal(attesterIds.length, 3);
        assert.equal(attesterIds[0], account1);
        assert.equal(await kycAttesterContract.getById(attesterIds[0]), true);
        assert.equal(attesterIds[1], account4);
        assert.equal(await kycAttesterContract.getById(attesterIds[1]), true);
        assert.equal(attesterIds[2], account3);
        assert.equal(await kycAttesterContract.getById(attesterIds[2]), true);

        // remove first account
        await kycAttesterContract.remove(account1);

        assert.equal(await kycAttesterContract.size(), 2);
        assert.equal(await kycAttesterContract.contains(account1), false);
        assert.equal(await kycAttesterContract.getById(account1), false);
        var attesterIds = await kycAttesterContract.getIds();
        assert.equal(attesterIds.length, 2);
        assert.equal(attesterIds[0], account3);
        assert.equal(await kycAttesterContract.getById(attesterIds[0]), true);
        assert.equal(attesterIds[1], account4);
        assert.equal(await kycAttesterContract.getById(attesterIds[1]), true);
    });
})