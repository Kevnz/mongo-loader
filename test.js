var { test } = require("tap")


test("Data should be loaded", async (t) => {

  var loader = require('./index');
  await loader.import()

  var testDB = require('mongo-start')();

  const collection = testDB.collection('people')

  const insertInto = await new Promise((resolve) => {
    return collection.find({}).toArray(function(err, docs) {

    console.log('in the callback', err)

    console.log('the count of docs count', docs.length)
    testDB.close()
    return resolve(docs.length)

    })
  })
  t.ok(insertInto === 3)

  await loader.purge()

  var testDB2 = require('mongo-start')();


  const collection2 = testDB2.collection('people')

  const after = await new Promise((resolve) => { 
    return collection2.find({}).toArray(function(err, docs) {
      testDB2.close()
      return resolve(docs.length)
    })
  })

  t.ok(after === 0)
  t.end()

});

