import { gql } from 'apollo-server-express';


export default gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    messages: [Message!]
  }

  type Token {
    token: String!
  }

  type AuthType {
    token: String!
    me: User!
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      role: String!
    ): Token!

    signIn(
      login: String!
      password: String!
    ): AuthType!

    deleteUser(id: ID!): Boolean!
  }

`;
