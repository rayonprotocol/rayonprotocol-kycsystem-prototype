const AddressBoolIterableMapImpl = artifacts.require('./AddressBoolIterableMapImpl.sol');

contract('AddressBoolIterableMap', function (accounts) {
    var addressBoolIterableMapContract;
    before('setup contract for each test', async () => {
        addressBoolIterableMapContract = await AddressBoolIterableMapImpl.deployed();
        console.log('AddressBoolIterableMapImpl is deployed: ' + addressBoolIterableMapContract.address);
    })

    it("Check empty list", async () => {
        assert.equal(await addressBoolIterableMapContract.size(), 0);
        var i;
        for (i = 0; i < accounts.length; i++) {
            assert.equal(await addressBoolIterableMapContract.contains(accounts[i]), false);
        }
    });

    it("Add first account", async () => {
        var account1 = accounts[0];
        await addressBoolIterableMapContract.add(account1);

        assert.equal(await addressBoolIterableMapContract.size(), 1);
        assert.equal(await addressBoolIterableMapContract.contains(account1), true);
        assert.equal(await addressBoolIterableMapContract.getByKey(account1), true);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 1);
        assert.equal(keys[0], account1);
    });
    it("Remove first account", async () => {
        var account1 = accounts[0];
        assert.equal(await addressBoolIterableMapContract.size(), 1);
        assert.equal(await addressBoolIterableMapContract.contains(account1), true);
        assert.equal(await addressBoolIterableMapContract.getByKey(account1), true);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 1);
        
        await addressBoolIterableMapContract.remove(account1);
        
        assert.equal(await addressBoolIterableMapContract.size(), 0);
        assert.equal(await addressBoolIterableMapContract.contains(account1), false);
        assert.equal(await addressBoolIterableMapContract.getByKey(account1), false);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 0);
    });
    it("Add first & second accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];

        // add first account
        await addressBoolIterableMapContract.add(account1);

        assert.equal(await addressBoolIterableMapContract.size(), 1);
        assert.equal(await addressBoolIterableMapContract.contains(account1), true);
        assert.equal(await addressBoolIterableMapContract.getByKey(account1), true);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 1);
        assert.equal(keys[0], account1);

        // add second account
        await addressBoolIterableMapContract.add(account2);

        assert.equal(await addressBoolIterableMapContract.size(), 2);
        assert.equal(await addressBoolIterableMapContract.contains(account2), true);
        assert.equal(await addressBoolIterableMapContract.getByKey(account2), true);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 2);
        assert.equal(keys[0], account1);
        assert.equal(keys[1], account2);

        // add second account again
        await addressBoolIterableMapContract.add(account2);

        assert.equal(await addressBoolIterableMapContract.size(), 2);
        assert.equal(await addressBoolIterableMapContract.contains(account2), true);
        assert.equal(await addressBoolIterableMapContract.getByKey(account2), true);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 2);
        assert.equal(keys[0], account1);
        assert.equal(keys[1], account2);
    });
    it("Add third & fourth accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];
        var account3 = accounts[2];
        var account4 = accounts[3];

        // add third account
        await addressBoolIterableMapContract.add(account3);

        assert.equal(await addressBoolIterableMapContract.size(), 3);
        assert.equal(await addressBoolIterableMapContract.contains(account3), true);
        assert.equal(await addressBoolIterableMapContract.getByKey(account3), true);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 3);
        assert.equal(keys[0], account1);
        assert.equal(keys[1], account2);
        assert.equal(keys[2], account3);

        // add fourth account
        await addressBoolIterableMapContract.add(account4);

        assert.equal(await addressBoolIterableMapContract.size(), 4);
        assert.equal(await addressBoolIterableMapContract.contains(account4), true);
        assert.equal(await addressBoolIterableMapContract.getByKey(account4), true);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 4);
        assert.equal(keys[0], account1);
        assert.equal(keys[1], account2);
        assert.equal(keys[2], account3);
        assert.equal(keys[3], account4);
    });
    it("remove accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];
        var account3 = accounts[2];
        var account4 = accounts[3];

        // remove second account
        await addressBoolIterableMapContract.remove(account2);

        assert.equal(await addressBoolIterableMapContract.size(), 3);
        assert.equal(await addressBoolIterableMapContract.contains(account2), false);
        assert.equal(await addressBoolIterableMapContract.getByKey(account2), false);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 3);
        assert.equal(keys[0], account1);
        assert.equal(await addressBoolIterableMapContract.getByKey(keys[0]), true);
        assert.equal(keys[1], account4);
        assert.equal(await addressBoolIterableMapContract.getByKey(keys[1]), true);
        assert.equal(keys[2], account3);
        assert.equal(await addressBoolIterableMapContract.getByKey(keys[2]), true);

        // remove first account
        await addressBoolIterableMapContract.remove(account1);

        assert.equal(await addressBoolIterableMapContract.size(), 2);
        assert.equal(await addressBoolIterableMapContract.contains(account1), false);
        assert.equal(await addressBoolIterableMapContract.getByKey(account1), false);
        var keys = await addressBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 2);
        assert.equal(keys[0], account3);
        assert.equal(await addressBoolIterableMapContract.getByKey(keys[0]), true);
        assert.equal(keys[1], account4);
        assert.equal(await addressBoolIterableMapContract.getByKey(keys[1]), true);
    });
})