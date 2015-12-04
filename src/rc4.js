var privateKey = '';
var version = require('./version.js');
require('./runtime.js');

function RC4(key) {
  privateKey = keySetup(key);
  this.version = version;
}

function convert(text) {
  var codes = [];

  for (var i = 0, ii = text.length; i < ii; i++) {
    codes.push(text.charCodeAt(i));
  }

  return codes;
}

function keySetup(key) {

  var K = [...Array(256).keys()],
    j = 0,
    key = convert(key);

  for (var i = 0, ii = K.length; i < ii; i++) {
    j = (j + K[i] + key[i % key.length]) % 256;
    [K[i], K[j]] = [K[j], K[i]];
  }

  return K;

}

var byteStreamGenerator = function *(K) {
  var i = 0,
    j = 0;

  while (true) {
    i = (i + 1) % 256;
    j = (j + K[i]) % 256;
    [K[i], K[j]] = [K[j], K[i]];
    yield (K[(K[i] + K[j]) % 256]);
  }
}

RC4.prototype.encrypt = function(input) {

  var outputText = '',
    byteStream = byteStreamGenerator(privateKey.slice(0));

  for (var i = 0, ii = input.length; i < ii; i++) {
    outputText += ('00' + (input.charCodeAt(i) ^ byteStream.next().value).toString(16)).substr(-2) ;
  }

  return outputText;
}

RC4.prototype.decrypt = function(input) {
  var outputText = '',
    byteStream = byteStreamGenerator(privateKey.slice(0));

  input = input.match(/[a-z0-9]{2}/gi);

  for (var i = 0, ii = input.length; i < ii; i++) {
    outputText += String.fromCharCode((parseInt(input[i], 16) ^ byteStream.next().value));
  }

  return outputText;
}

module.exports = RC4;