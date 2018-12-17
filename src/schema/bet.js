import { gql } from 'apollo-server-express';

export default gql`
  type Bet {
    id: ID!
    userId: ID!
    creatorId: ID!
    amount: Int!
    eventId: String!
    result: BetResult
  }

  extend type Query {
    bet(id: ID!): Bet
    bets: [Bet!]
  }

  extend type Mutation {
    createBet(userId: ID!, creatorId: ID!, amount: Int!, eventId: String!): Bet
  }
`;