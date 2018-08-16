# RayonProtocol KYC System Prototype

This is a prototype of RayonProtocol's KYC System.

## About
### Architecture
 - The Rayon KYC System server signs provided identity data
 - KYC Management smart contract verifies and registers KYC attestation data on the blockchain.
![kyc_arch](doc/kyc_arch.png)


## Getting Started

### Installing

- clone the repository to your local drive

```
$ git clone https://github.com/rayonprotocol/rayonprotocol-kycsystem-prototype.git
```

### git submodule init & update

- Initialize the submodule 'rayonprotocol-common-contract'.

```
$ cd rayonprotocol-kycsystem-prototype
$ git submodule init
$ git submodule update
```

- install truffle

```
npm install -g truffle
```

- install [ganache](http://truffleframework.com/ganache/) for use of local development node

- install node_module

```
$ npm install 
```

#### Deployment

- deploy smart contracts

```
$ truffle deploy
```

#### Execution

- start kyc system server

```
$ cd nodejs
$ node kyc_server.js <keystore file>

KYC Attester's keystore filepath: <keystore file>, exists: true

Keystore password: *********

Loading keystore file success.
KYC Attester ID: 0x1a5232919693b2f3d5ec2a5e44ae925c1edd4c95

KYC Prototype server is running on port 8001!

```
- kyc system server is running on port 8001

#### Test

- execute test scripts

```
$ truffle test

```

## Built With
* [Truffle](https://truffleframework.com/) - Ethereum Smart Contract Framework
* [Solidity](https://github.com/ethereum/solidity) - Used to develop the Reverse Inquiry smart contracts
* [Node.js](https://nodejs.org/en/) - Server application framework for KYC System

## Acknowledgments
* In practice, the Rayon KYC System will connect to an external (third party) KYC service provider before making a signature.

