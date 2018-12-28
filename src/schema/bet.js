import { gql } from 'apollo-server-express';

export default gql`
  type Bet {
    id: ID!
    userId: ID!
    creatorId: ID!
    amount: Int!
    eventId: ID!
    result: BetResult
    siteKey: String!
    oddType: String!
    oddIndex: Int!
    team: String!
  }

  extend type Query {
    bet(id: ID!): Bet
    bets: [Bet!]
  }

  input CreateBetInput {
    userId: ID!
    creatorId: ID!
    amount: Int!
    eventId: ID!
    siteKey: String!
    oddType: String!
    oddIndex: Int!
    team: String!
  }

  extend type Mutation {
    createBet(input: CreateBetInput!): Bet
  }
`;