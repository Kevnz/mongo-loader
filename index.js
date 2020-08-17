const fs = require('fs');
const path = require('path');
const db = require('mongo-start');

const loadFixtures = function fixtureLoader(pathToFixtures) {
  return new Promise((resolve) => {
    if (fs.existsSync(pathToFixtures)) {

      const files = fs.readdirSync(pathToFixtures);
      files.forEach(function (file) {
        const res = fs.readFileSync(path.join(pathToFixtures, file), { encoding: 'utf8' });
        const data = JSON.parse(res);
        db(file.replace('.json', '')).remove();
        data.forEach(function (item) {
          db(file.replace('.json', '')).save(item, function (err, data) { console.log('SAVE ERR', err) });
        });
      });

    } else {
      console.log('The fixtures folder does not exist');
    }
    return resolve();
})
};

const removeFixtures = function fixtureRemover(pathToFixtures) {
  return new Promise((resolve) => {
  if (fs.existsSync(pathToFixtures)) {

    const files = fs.readdirSync(pathToFixtures);
    files.forEach(function (file) {
      db(file.replace('.json', '')).drop();
    });

  } else {
    console.log('The fixtures folder does not exist');
  }
  return resolve();
})
};
module.exports = {
  import: function () {
    const pathToFixtures = path.join(process.cwd(), 'test/fixtures/');
    return loadFixtures(pathToFixtures);
  },
  purge: function () {
    const pathToFixtures = path.join(process.cwd(), 'test/fixtures/');
    return removeFixtures(pathToFixtures);
  }
}