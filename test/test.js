var assert = require('assert'),
  RC4 = require('../dist/rc4.js');


describe('RC4', function() {

  var test = new RC4('Secret key');

  describe('Encrypt', function () {

    it('should encrypt correctly.', function () {
      var encrypted = test.encrypt('Transfer 100GBP to account 1234.');
      assert.equal(encrypted, '4e40b844800742db4f9b8879e75727b244988fa23854af93f3252ee07935fbb4');
    });

  });

  describe('Decrypt', function() {
    it('should decrypt correctly.', function () {
      var decrypted = test.decrypt('4e40b844800742db4f9B8879e75727B244988fa23854af93f3252ee07935fbb4');
      assert.equal(decrypted, 'Transfer 100GBP to account 1234.');
    });
  });


});