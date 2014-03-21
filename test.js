var test = require("tap").test


test("Data should be loaded", function (t) {
    var loader = require('./index');
    loader.import(function () {
        var testDB = require('mongo-start')('people');
        testDB.find(function(err, docs) {
            t.notOk(err, "no error"); 
            t.ok(docs.length > 0, "should return multiple items");
            t.end();
        });
    });
});
test("Data should be removed", function (t) {
    var loader = require('./index');
    loader.purge(function () {
        var testDB = require('mongo-start')('people')
        testDB.find(function(err, docs) {
            console.log(err);
            console.log(docs);
            t.notOk(err, "no error"); 
            t.ok(docs.length === 0, "should return no items");
            t.end();
        });
    });
});