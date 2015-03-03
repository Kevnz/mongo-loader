var fs = require('fs');
var path = require('path');
var db = require('mongo-start');

var loadFixtures = function fixtureLoader (pathToFixtures, callback) { 
    if (fs.existsSync(pathToFixtures)) {

        var files = fs.readdirSync(pathToFixtures);
        files.forEach(function (file) {
            var res = fs.readFileSync(path.join(pathToFixtures, file),{encoding:'utf8'});
            var data = JSON.parse(res);
            db(file.replace('.json', '')).remove();
            data.forEach(function(item) { 
                console.log(item)
                db(file.replace('.json', '')).save(item, function(err, data) { console.log('SAVE ERR',err)});
            });
        });

    } else {
        console.log('The fixtures folder does not exist');
    }
    callback();
};

var removeFixtures = function fixtureRemover (pathToFixtures, callback) { 
    if(fs.existsSync(pathToFixtures)) {

        var files = fs.readdirSync(pathToFixtures);
        files.forEach(function (file) {
            db(file.replace('.json', '')).drop();
        });

    } else {
        console.log('The fixtures folder does not exist');
    }
    callback();
};
module.exports = {
    import: function (callback) {
        var pathToFixtures = path.join(process.cwd(), 'test/fixtures/');
        loadFixtures(pathToFixtures, callback);
    },
    purge: function (callback) {
        var pathToFixtures = path.join(process.cwd(),'test/fixtures/'); 
        removeFixtures(pathToFixtures, callback);
    }
}