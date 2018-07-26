var console = require('console');

function usage() { // print usage
    console.log("usage: node admin_register_kycid.js <kyc attestor id>");
    console.log("");
}
if (process.argv.length <= 2) {
    console.log("Input kyc attestor id.");
    console.log("");
    usage();
    process.exit(-1);
}

const kycAttestorId = process.argv[2];
console.log("kyc attestor id: " + kycAttestorId);
console.log("");

// var keystore = fs.readFileSync(keystoreFilePath).toString();
// var etherWallet = require('ethereumjs-wallet');
// var wallet;
// try {
//     wallet = etherWallet.fromV3(keystore, keystorePassword); // loading ethereum account from keystore file
//     // wallet = etherWallet.fromPrivateKey(Buffer.from('98d88baf868ed7f5b65e37753ef58b33119447ef56f1adc6b73127bd2bcaa219', 'Hex'));
// } catch (exception) { // error
//     if (exception.message == 'Key derivation failed - possibly wrong passphrase') { // wrong keystore file password
//         console.log("Wrong keystore password.");
//     } else { // unknown error
//         console.log(exception);
//     }
//     process.exit(-1);
// }
// console.log("Loading keystore file success.");
// console.log('KYC Attestor ID: ' + wallet.getAddressString());
// console.log("");

// // starting restapi server
// var Web3 = require('web3');
// var web3 = new Web3();
// var express = require('express');
// var bodyParser = require('body-parser');
// var app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const port = 3000;
// app.listen(port, function () {
//     console.log("KYC Prototype server is running on port " + port + "!");
// });

// app.post('/:address', function (req, res) {
//     const address = req.params.address;
//     console.log("New request, address: " + address + ", body: " + JSON.stringify(req.body));
//     const authId = req.body.id; // id in the request is used as authId.
//     const authHash = web3.utils.sha3(authId);
//     const signatureData = web3.eth.accounts.sign(authHash, wallet.getPrivateKeyString());
//     const authSignature = signatureData.signature;
//     const v = signatureData.v;
//     const r = signatureData.r;
//     const s = signatureData.s;

//     console.log("Authentication is passed!, address: " + address);
//     // console.log("address:" + address + ", authId:" + authId + ", authHash:" + authHash + ", authSignature:" + authSignature + ", v:" + v + ", r:" + r + ", s:" + s);
//     var resBody = new Object();
//     resBody.address = address;
//     resBody.authId = authId;
//     resBody.authHash = authHash;
//     resBody.authSignature = authSignature;
//     resBody.v = v;
//     resBody.r = r;
//     resBody.s = s;

//     // send response
//     console.log("Response, address: " + address + ", body: " + JSON.stringify(resBody));
//     res.send(resBody);
// });