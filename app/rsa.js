'use strict';

const fs = require('fs');
const NodeRSA = require('node-rsa');

module.exports = class RSA {
  constructor (callback) {
    this.key = new NodeRSA();
    this.initializeKey(callback);
  }

  initializeKey (callback) {
    fs.readFile('./public.key', (err, pub) => {
      if (err) {
        this.key.generateKeyPair();
        this.saveKey();
      } else {
        this.key.importKey(pub, 'public');
        fs.readFile('./private.key', (err, prv) => {
          if (err) {
            console.log('could not find private key.');
          } else {
            this.key.importKey(prv, 'private');
            callback();
          }
        });
      }
    });
  }

  saveKey () {
    let publicPem = this.key.exportKey('public');
    fs.writeFile('./public.key', publicPem, (err) => {
      if (err) { console.log('could export public key'); }
    });

    let privatePem = this.key.exportKey('private');
    fs.writeFile('./private.key', privatePem, (err) => {
      if (err) { console.log('could export private key'); }
    });
  }

  getKey () {
    if (this.key.isPublic() && this.key.isPrivate()) {
      return this.key;
    } else {
      console.log('key is not ready');
    }
  }
};
