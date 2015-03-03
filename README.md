# Mongo-Loader

Take json files and load them as collections into mongodb, then deletes them from the db when the tests are run.

## Install
```
npm install mongo-loader --save-dev
```
## Usage

```
var loader = require('mongo-loader');

loader.import(function () {
    //open a connection to your mongodb and data is there
});
//when done
loader.purge(function () {
   //additional clean up tasks 
});
```
## The JSON Files
The files need to be in tests\fixtures and named one per collection. Check out the folders in this repo to see.

### Configuring the connection
This module uses  [mongo-start](https://www.npmjs.com/package/mongo-start)and [xtconf](https://www.npmjs.com/package/xtconf) to connect so a config.json file with a "mongo-connection" in it will get you up and running.