RC4 in JavaScript
==

### Background

Previously I had written the RC4 algorithm in Python. This was an experiment for fun to see how that would look translated into JavaScript using features from ES6 with Babel.js, due to alot of the features not yet being available. Without all of the Babel code this code came in at 72 lines (have a look in src/rc4.js).

### Using rc4.js

To use rc4.js, once you have included it in your project. Simply create a new instance of it, passing rc4 your key. For example:

```
var test = new RC4('This is my secret key');
```

You then have the option to encrypt or decrypt text by using the following public functions:

```
test.decrypt(/* Text to decrypt to go here */);
// OR
test.encrypt(/* Text to encrypt to go here */);
```

### Tests and Linting

Tests are written in Mocha and I am using eslint for linting. To configure eslint, you can find the options in the conf folder.

### Contributing

If you see any improvements or any problems with my implementation, create an issue for it!

If you want to contribute, I am using Grunt for running my tasks.

Running `grunt` will run a 'developing' version where all of the tasks will be carried out and then it will begin watching the files for any changes.

Running `grunt build` will create a normal and minified build which will need to be done before it can be merged.
