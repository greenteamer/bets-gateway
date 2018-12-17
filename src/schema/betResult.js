import { gql } from 'apollo-server-express';

export default gql`
  type BetResult {
    id: ID!
    result: Int!
  }

  extend type Query {
    betResult(id: ID!): BetResult
    betResults: [BetResult!]
  }

  extend type Mutation {
    createBetResult(betId: ID!, result: Int!): BetResult
  }
`;