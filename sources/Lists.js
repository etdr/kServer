
// const { MongoDataSource } = require('apollo-datasource-mongodb')

// class Lists extends MongoDataSource {
//   getList (id) {
//     return this.findOneById(id)
//   }

//   getLists (ids) {
//     return this.findManyByIds(ids)
//   }
// }

const Lists = require('../models/Lists')
const Items = require('../models/Items')

const { DataSource } = require('apollo-datasource')

// const client = require('../db')


class ListAPI extends DataSource {

  constructor () {
    super()
    // this.client = client
    // this.db = db
    
    // this.lists = db.collection('lists')
    // USE BELOW IF STRICT MODE
    // async function attachListsCollection () {
    //   this.lists = await db.collection('lists')
    // }
    // attachListsCollection()
  }

  initialize (config) {
    this.context = config.context
  }

  async getAllLists () {
    const lists = await Lists.find({}).toArray()
    return lists
  }

  async getLists (userid) {
    const lists = await Lists.find({ where: { userid: userid }}).toArray()
    return lists
  }

  async getList (id) {
    const list = await this.lists.findOne({ where: { id }})
    return list
  }

  async postList (title, items=[], tags=[]) {
    const userId = this.context.user.id
    const result = await Lists.create({
      userId, title, items, tags
    })
    return result
  }

  async postItems (listId, itemsinput) {
    const userId = this.context.user.id

    for (let i of itemsinput.items) {
      await Items.create({
        description: i.content,
        listId
      })
    }

    const result = await Lists.update({
      items: itemsinput.ordering
    },
    { listId })
    return result
  }

  async updateItems ()
}

module.exports = ListAPI