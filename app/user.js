'use strict';

const NodeRSA = require('node-rsa');

module.exports = class User {
  constructor (id, username, publicKey) {
    this.id = id;
    this.username = username;
    this.publicKey = new NodeRSA(publicKey, 'public');
  }
};
