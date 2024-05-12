const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Invoice {
    id: ID!
    amount: Float!
    paid_at: String!
    customer: ID!
  }

  type Query {
    getUser(id: ID!): User
    getUsers: [User]
    getInvoice(id: ID!): Invoice
    getInvoices: [Invoice]
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    updateUser(id: ID!, name: String, email: String, password: String): User
    deleteUser(id: ID!): User
    createInvoice(amount: Float!, paid_at: String!, customer: ID!): Invoice
    updateInvoice(id: ID!, amount: Float!, paid_at: String!, customer: String!): Invoice
    deleteInvoice(id: ID!): Invoice
  }
`);

module.exports = schema;