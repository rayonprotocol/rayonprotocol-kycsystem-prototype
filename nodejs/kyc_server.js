var console = require('console');

function usage() { // print usage
    console.log("usage: node kyc_server.js <keystore filepath>");
    console.log("");
}
if (process.argv.length <= 2) {
    console.log("Input keystore filepath.");
    console.log("");
    usage();
    process.exit(-1);
}

var fs = require('fs');
const keystoreFilePath = process.argv[2];
const keystoreFilePathExists = fs.existsSync(keystoreFilePath); // check if keystore file exists
if (keystoreFilePathExists) {
    console.log("KYC Attester's keystore filepath: " + keystoreFilePath + ", exists: " + keystoreFilePathExists);
    console.log("");
} else {// if not, error occurs
    console.log("KYC Attester's keystore file does not exist. path: " + keystoreFilePath);
    console.log("");
    process.exit(-1);
}

var readlineSync = require('readline-sync');
var keystorePassword = readlineSync.question('Keystore password: ', { // input keystore file password in stdin
    hideEchoBack: true // The typed text on screen is hidden by `*` (default). 
});
console.log("password: " + keystorePassword);
console.log("");

var keystore = fs.readFileSync(keystoreFilePath).toString();
var etherWallet = require('ethereumjs-wallet');
var wallet;
try {
    wallet = etherWallet.fromV3(keystore, keystorePassword); // loading ethereum account from keystore file
    // wallet = etherWallet.fromPrivateKey(Buffer.from('98d88baf868ed7f5b65e37753ef58b33119447ef56f1adc6b73127bd2bcaa219', 'Hex'));
} catch (exception) { // error
    if (exception.message == 'Key derivation failed - possibly wrong passphrase') { // wrong keystore file password
        console.log("Wrong keystore password.");
    } else { // unknown error
        console.log(exception);
    }
    process.exit(-1);
}
var attesterId = wallet.getAddressString();
console.log("Loading keystore file success.");
console.log('KYC Attester ID: ' + attesterId);
console.log("");

// starting restapi server
var Web3 = require('web3');
var web3 = new Web3();
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;
app.listen(port, function () {
    console.log("KYC Prototype server is running on port " + port + "!");
});

app.get('/', function (req, res) { // get attester info
    console.log("Request, url: /");

    var resBody = new Object();
    resBody.attesterId = attesterId;

    // send response
    console.log("Response, url: /, body: " + JSON.stringify(resBody));
    res.send(resBody);
});

app.post('/:address', function (req, res) { // authenticate auth id
    const address = req.params.address;
    console.log("New request, url: /" + address + ", body: " + JSON.stringify(req.body));
    const authId = req.body.id; // id in the request is used as authId.
    const authHash = web3.utils.sha3(authId);
    const signatureData = web3.eth.accounts.sign(authHash, wallet.getPrivateKeyString());
    const authSignature = signatureData.signature;
    const v = signatureData.v;
    const r = signatureData.r;
    const s = signatureData.s;

    console.log("Authentication is passed!, address: " + address);
    // console.log("address:" + address + ", authId:" + authId + ", authHash:" + authHash + ", authSignature:" + authSignature + ", v:" + v + ", r:" + r + ", s:" + s);
    var resBody = new Object();
    resBody.attesterId = attesterId;
    resBody.address = address;
    resBody.authId = authId;
    resBody.authHash = authHash;
    resBody.authSignature = authSignature;
    resBody.v = v;
    resBody.r = r;
    resBody.s = s;

    // send response
    console.log("Response, url: /" + address + ", body: " + JSON.stringify(resBody));
    res.send(resBody);
});