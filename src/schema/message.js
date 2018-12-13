import { gql } from 'apollo-server-express';


export default gql`
  type Message {
    id: ID!
    text: String!
    user: User!
    createdAt: Date!
  }

  extend type Query {
    messages: [Message!]!
    message(id: ID!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Message
  }
`;
