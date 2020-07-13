
// const MongoClient = require('mongodb').MongoClient;

// // const uri = `mongodb://${process.env.MONGOUSER}:${process.env.MONGOPW}@localhost`
// const uri = `mongodb://localhost`

// const client = new MongoClient(uri)



// module.exports = client






const Seq = require('sequelize')

const seq = new Seq(process.env.DATABASE_URL, {
  dialect: "postgres"
})

seq.authenticate()
  .then(() => console.log('connected to postgres'))
  .catch(() => console.error('not connected to postgres'));


module.exports = seq


const Users = require('./models/Users')
const Lists = require('./models/Lists')
const Items = require('./models/Items')


Users.hasMany(Lists)
Lists.belongsTo(Users)

