/* global describe it */
const should = require('should/as-function');
const Registry = require('../app/registry');
const User = require('../app/user');

describe('User', () => {
  describe('#constructor', () => {
    let registry = new Registry();
    it('should have a registry property', () => {
      should(registry).have.property('registry');
    });
  });

  describe('#initializeRegistry', () => {
    let registry = new Registry();
    let users = {
      '00001': {
        id: '1',
        username: 'dixie',
        publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnKEoRj9jvLqostUc0Mo0\nwxxouUR11tm7TMWEVtbyKXszPJ5QWQzSx/eL4u1qwdSsXgMil41vT1eMRdzu2yFP\nhWpMgVCTEE9jXGN5IpxldJZhUcNGrGD9tEu8lW+1O4jf+hIxJhlqZEv6mmRCBiW+\nScPFlFkJQ4mPmCh3bIKn0eOhak2YUwjM8BjGH11Dz0XIbazGh9huFNPEHRvkpIY3\nGe3TJ6e/f19e9xzv+kGEqofJSmpNUs4uD0/YgyIuCMrufe2oZQMVRVAdCIlNPpcK\nWJug14ykiubOEYy39L/L6ZisJnU70GPxVyFQxEFCYezAQPRRDf+YNRP5mu5Si18b\nUQIDAQAB\n-----END PUBLIC KEY-----'
      },
      '00010': {
        id: '2',
        username: 'case',
        publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnKEoRj9jvLqostUc0Mo0\nwxxouUR11tm7TMWEVtbyKXszPJ5QWQzSx/eL4u1qwdSsXgMil41vT1eMRdzu2yFP\nhWpMgVCTEE9jXGN5IpxldJZhUcNGrGD9tEu8lW+1O4jf+hIxJhlqZEv6mmRCBiW+\nScPFlFkJQ4mPmCh3bIKn0eOhak2YUwjM8BjGH11Dz0XIbazGh9huFNPEHRvkpIY3\nGe3TJ6e/f19e9xzv+kGEqofJSmpNUs4uD0/YgyIuCMrufe2oZQMVRVAdCIlNPpcK\nWJug14ykiubOEYy39L/L6ZisJnU70GPxVyFQxEFCYezAQPRRDf+YNRP5mu5Si18b\nUQIDAQAB\n-----END PUBLIC KEY-----'
      },
      '00011': {
        id: '3',
        username: 'mona',
        publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnKEoRj9jvLqostUc0Mo0\nwxxouUR11tm7TMWEVtbyKXszPJ5QWQzSx/eL4u1qwdSsXgMil41vT1eMRdzu2yFP\nhWpMgVCTEE9jXGN5IpxldJZhUcNGrGD9tEu8lW+1O4jf+hIxJhlqZEv6mmRCBiW+\nScPFlFkJQ4mPmCh3bIKn0eOhak2YUwjM8BjGH11Dz0XIbazGh9huFNPEHRvkpIY3\nGe3TJ6e/f19e9xzv+kGEqofJSmpNUs4uD0/YgyIuCMrufe2oZQMVRVAdCIlNPpcK\nWJug14ykiubOEYy39L/L6ZisJnU70GPxVyFQxEFCYezAQPRRDf+YNRP5mu5Si18b\nUQIDAQAB\n-----END PUBLIC KEY-----'
      }
    };
    it('should initialize registry with a supplied dictionary of users', () => {
      registry.initializeRegistry(users);
      should(registry.getUsers()['1']).be.instanceOf(User);
      should(Object.keys(registry.getUsers()).length).be.exactly(3);
    });
  });

  describe('#addUser', () => {
    let registry = new Registry();
    it('should add a user to registry', () => {
      should(Object.keys(registry.getUsers()).length).be.exactly(0);
      registry.addUser({
        id: '1',
        username: 'dixie',
        publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnKEoRj9jvLqostUc0Mo0\nwxxouUR11tm7TMWEVtbyKXszPJ5QWQzSx/eL4u1qwdSsXgMil41vT1eMRdzu2yFP\nhWpMgVCTEE9jXGN5IpxldJZhUcNGrGD9tEu8lW+1O4jf+hIxJhlqZEv6mmRCBiW+\nScPFlFkJQ4mPmCh3bIKn0eOhak2YUwjM8BjGH11Dz0XIbazGh9huFNPEHRvkpIY3\nGe3TJ6e/f19e9xzv+kGEqofJSmpNUs4uD0/YgyIuCMrufe2oZQMVRVAdCIlNPpcK\nWJug14ykiubOEYy39L/L6ZisJnU70GPxVyFQxEFCYezAQPRRDf+YNRP5mu5Si18b\nUQIDAQAB\n-----END PUBLIC KEY-----'
      });
      should(Object.keys(registry.getUsers()).length).be.exactly(1);
    });
  });

  describe('#removeUser', () => {
    let registry = new Registry();
    it('should remove a user from the registry', () => {
      registry.addUser({
        id: '1',
        username: 'dixie',
        publicKey: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnKEoRj9jvLqostUc0Mo0\nwxxouUR11tm7TMWEVtbyKXszPJ5QWQzSx/eL4u1qwdSsXgMil41vT1eMRdzu2yFP\nhWpMgVCTEE9jXGN5IpxldJZhUcNGrGD9tEu8lW+1O4jf+hIxJhlqZEv6mmRCBiW+\nScPFlFkJQ4mPmCh3bIKn0eOhak2YUwjM8BjGH11Dz0XIbazGh9huFNPEHRvkpIY3\nGe3TJ6e/f19e9xzv+kGEqofJSmpNUs4uD0/YgyIuCMrufe2oZQMVRVAdCIlNPpcK\nWJug14ykiubOEYy39L/L6ZisJnU70GPxVyFQxEFCYezAQPRRDf+YNRP5mu5Si18b\nUQIDAQAB\n-----END PUBLIC KEY-----'
      });
      should(Object.keys(registry.getUsers()).length).be.exactly(1);
      registry.removeUser('1');
      should(Object.keys(registry.getUsers()).length).be.exactly(0);
    });
  });
});
