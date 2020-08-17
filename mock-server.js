const MongodbMemoryServer = require('mongodb-memory-server').default
const {isFreePort} = require('node-port-check');
let mongoServer
const setupServerReturnUri = async () => {
  const isFree = await isFreePort(27017)
  console.log('port is free?', isFree)
  if (!isFree) {
    console.log('return no server start')
    return process.env.MONGODB_URI
  }
  mongoServer = new MongodbMemoryServer({
    debug: true,
    instance: {
      dbName: 'mongostart',
      port: 27017,
    },
  })

  const inMemoryUri = await mongoServer.getConnectionString()

  process.env.MONGODB_URI = inMemoryUri
  process.env.MONGODB_DB = 'anga'
  return inMemoryUri
}

setupServerReturnUri()