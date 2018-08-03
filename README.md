# RayonProtocol KYC System Prototype

This is a prototype of RayonProtocol's KYC system

### Architecture
![kyc_arch](doc/kyc_arch.png)


### Development
#### Installation

- clone the repository to your local drive

```
git clone https://github.com/rayonprotocol/rayonprotocol-kycsystem-prototype.git
```

- install truffle

```
npm install -g truffle
```

- install ganache for use of local development node

http://truffleframework.com/ganache/

- install yarn (for mac)

https://yarnpkg.com/lang/en/docs/install/#mac-stable

- install node_module

```
cd rayonprotocol-kycsystem-prototype
yarn
```

#### Deployment

- deploy smart contracts

```
truffle deploy

```

#### Execution

- start kyc system server

```
cd nodejs
node kyc_server.js <keystore file>

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
truffle test

```


