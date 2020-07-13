
const { gql } = require('apollo-server-koa')


const typeDefs = gql`

scalar DateTime

type User {
  id: ID!
  username: String!
  password: String!
}

type List {
  id: ID!
  userid: ID!
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
  userid: ID!
  order: Int
  content: String!
}

input ItemInput {
  id: ID!
  content: String!
}

input ItemsInput {
  ordering: [String]!
  items: [ItemInput!]!
}


type Query {
  lists: [List]!
  list(id: ID!): List
}

type Mutation {
  newList(listInput: ListInput): List
  addItems(listid: ID!, items: [ItemsInput!]!): List
  removeItems(listid: ID!, itemIDs: [ID!]!): Int
}

`

module.exports = typeDefs