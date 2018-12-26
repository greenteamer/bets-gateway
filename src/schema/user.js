import { gql } from 'apollo-server-express';


export default gql`
  type User {
    id: ID!
    agentId: ID
    username: String!
    email: String!
    role: String!
    messages: [Message!]
    players: [User!]
    bets: [Bet!]
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
      agentId: ID
    ): User!

    signIn(
      login: String!
      password: String!
    ): AuthType!

    deleteUser(id: ID!): Boolean!
  }

`;
