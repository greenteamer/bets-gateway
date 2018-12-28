import { gql } from 'apollo-server-express';

export default gql`
  type OddsItem {
    h2h: [Float!]
  }

  type Site {
    site_key: String!
    site_nice: String!
    last_update: Int!
    odds: OddsItem!
  }

  type Odd {
    id: ID!
    sport_key: String!
    sport_nice: String!
    teams: [String!]
    commence_time: Int!
    home_team: String
    sites: [Site!]
    sites_count: Int!
  }

  extend type Query {
    odds(sport_key: String!): [Odd!]
  }
`;