
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPW}@localhost`

const client = new MongoClient(uri)

client.connect(err => {
  if (err === null) {
    console.log('connected to mongo')
  } else {
    console.error(err)
  }
})

const db = client.db('k')

module.exports = {
  client,
  db
}
