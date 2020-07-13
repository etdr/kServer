
const { ApolloServer, gql } = require('apollo-server-koa')
const typeDefs = require('./schema')
const ListAPI = require('./sources/Lists')

const server = new ApolloServer({
  typeDefs,
  dataSources: () => ({
    listAPI: new ListAPI()
  })
})

module.exports = server