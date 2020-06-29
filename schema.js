
const { gql } = require('apollo-server-koa')


const typeDefs = gql`

scalar DateTime

type User {
  id: ID!
  email: String!
  password: String!
}

type List {
  id: ID!
  title: String!
  items: [Item]!
  tags: [String]!
  createdAt: DateTime
  updatedAt: DateTime
}

input ListInput {
  title: String!
  items: [ItemInput]
  tags: [String]
}

type Item {
  id: ID!
  order: Int
  content: String!
}

input ItemInput {
  order: Int
  content: String!
}


type Query {
  lists: [List]!
  list(id: ID!): List
}

type Mutation {
  newList(listInput: ListInput): List
  addItems(listid: ID!, items: [ItemInput!]!): List
  removeItems(listid: ID!, itemIDs: [ID!]!): Int
}

`

module.exports = typeDefs