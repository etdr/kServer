
const { ApolloServer, gql } = require('apollo-server-koa')
const typeDefs = require('./schema')

const server = new ApolloServer({
  typeDefs
})

module.exports = server