
const client = require('../db')


class ListDriver {

  constructor (cli) {
    this.client = cli
    this.db = cli.db('k')
  }




}


const driver = new ListDriver(client)

module.exports = driver