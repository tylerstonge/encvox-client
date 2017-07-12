'use strict';

const User = require('./user');

module.exports = class Registry {
  constructor () {
    this.registry = {};
  }

  initializeRegistry (users) {
    for (var id in users) {
      if (users.hasOwnProperty(id)) {
        let user = users[id];
        this.registry[user.id] = new User(user.id, user.username, user.publicKey);
      }
    }
  }

  addUser (user) {
    this.registry[user.id] = new User(user.id, user.username, user.publicKey);
  }

  removeUser (id) {
    delete this.registry[id];
  }

  emitMessage (socket, message) {
    for (var id in this.registry) {
      if (this.registry.hasOwnProperty(id)) {
        let user = this.registry[id];
        socket.emit('message', {
          recipient: user.id,
          message: user.publicKey.encrypt(message, 'base64')
        });
      }
    }
  }
};
