const TestAddressToBoolIterableMap = artifacts.require('./TestAddressToBoolIterableMap.sol');

contract('TestAddressToBoolIterableMap', function (accounts) {
    var testAddressToBoolIterableMapContract;
    before('setup contract for each test', async () => {
        testAddressToBoolIterableMapContract = await TestAddressToBoolIterableMap.new();
        console.log('TestAddressToBoolIterableMap is deployed: ' + testAddressToBoolIterableMapContract.address);
    })

    it("Check empty list", async () => {
        assert.equal(await testAddressToBoolIterableMapContract.size(), 0);
        var i;
        for (i = 0; i < accounts.length; i++) {
            assert.equal(await testAddressToBoolIterableMapContract.contains(accounts[i]), false);
        }
    });

    it("Add first account", async () => {
        var account1 = accounts[0];
        await testAddressToBoolIterableMapContract.add(account1, true);

        assert.equal(await testAddressToBoolIterableMapContract.size(), 1);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account1), true);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account1), true);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 1);
        assert.equal(keys[0], account1);
    });
    it("Remove first account", async () => {
        var account1 = accounts[0];
        assert.equal(await testAddressToBoolIterableMapContract.size(), 1);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account1), true);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account1), true);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 1);

        await testAddressToBoolIterableMapContract.remove(account1);

        assert.equal(await testAddressToBoolIterableMapContract.size(), 0);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account1), false);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account1), false);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 0);
    });
    it("Add first & second accounts", async () => {
        var account1 = accounts[0];
        var account2 = accounts[1];

        // add first account
        await testAddressToBoolIterableMapContract.add(account1, true);

        assert.equal(await testAddressToBoolIterableMapContract.size(), 1);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account1), true);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account1), true);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 1);
        assert.equal(keys[0], account1);

        // add second account
        await testAddressToBoolIterableMapContract.add(account2, true);

        assert.equal(await testAddressToBoolIterableMapContract.size(), 2);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account2), true);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account2), true);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 2);
        assert.equal(keys[0], account1);
        assert.equal(keys[1], account2);

        // add second account again
        await testAddressToBoolIterableMapContract.add(account2, true);

        assert.equal(await testAddressToBoolIterableMapContract.size(), 2);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account2), true);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account2), true);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
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
        await testAddressToBoolIterableMapContract.add(account3, true);

        assert.equal(await testAddressToBoolIterableMapContract.size(), 3);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account3), true);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account3), true);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 3);
        assert.equal(keys[0], account1);
        assert.equal(keys[1], account2);
        assert.equal(keys[2], account3);

        // add fourth account
        await testAddressToBoolIterableMapContract.add(account4, true);

        assert.equal(await testAddressToBoolIterableMapContract.size(), 4);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account4), true);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account4), true);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
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
        await testAddressToBoolIterableMapContract.remove(account2);

        assert.equal(await testAddressToBoolIterableMapContract.size(), 3);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account2), false);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account2), false);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 3);
        assert.equal(keys[0], account1);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(keys[0]), true);
        assert.equal(keys[1], account4);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(keys[1]), true);
        assert.equal(keys[2], account3);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(keys[2]), true);

        // remove first account
        await testAddressToBoolIterableMapContract.remove(account1);

        assert.equal(await testAddressToBoolIterableMapContract.size(), 2);
        assert.equal(await testAddressToBoolIterableMapContract.contains(account1), false);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(account1), false);
        var keys = await testAddressToBoolIterableMapContract.getKeys();
        assert.equal(keys.length, 2);
        assert.equal(keys[0], account3);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(keys[0]), true);
        assert.equal(keys[1], account4);
        assert.equal(await testAddressToBoolIterableMapContract.getByKey(keys[1]), true);
    });
})