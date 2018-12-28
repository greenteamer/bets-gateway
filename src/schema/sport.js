import { gql } from 'apollo-server-express';

export default gql`
  type Sport {
    id: ID!
    key: String!
    active: Boolean!
    group: String!
    details: String!
    title: String!
  }

  extend type Query {
    sports: [Sport!]
  }
`;