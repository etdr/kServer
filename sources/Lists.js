
// const { MongoDataSource } = require('apollo-datasource-mongodb')

// class Lists extends MongoDataSource {
//   getList (id) {
//     return this.findOneById(id)
//   }

//   getLists (ids) {
//     return this.findManyByIds(ids)
//   }
// }

const { DataSource } = require('apollo-datasource')

const { client, db } = require('../db')


class ListAPI extends DataSource {

  constructor () {
    super()
    this.client = client
    this.db = db
    
    this.lists = db.collection('lists')
    // USE BELOW IF STRICT MODE
    // async function attachListsCollection () {
    //   this.lists = await db.collection('lists')
    // }
    // attachListsCollection()
  }

  initialize (config) {
    this.context = config.context
  }

  async getLists () {
    const lists = await this.lists.find({}).toArray()
    return lists
  }

  async getList (id) {
    const list = await this.lists.findOne({ id })
    return list
  }
}

module.exports = ListAPI