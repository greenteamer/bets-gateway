import { gql } from 'apollo-server-express';


export default gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
    messages: [Message!]
  }

  extend type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }
`;
