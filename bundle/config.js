// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
  logging: true,

  intentMap: {
    'AMAZON.StopIntent': 'END'
  },

  db: {
    MongoDb: {
      databaseName: 'test-development',
    	collectionName: 'UserData',
    	uri: 'mongodb://cedex:cedex12345@ds119662.mlab.com:19662/test-development'
    }
  }
}
