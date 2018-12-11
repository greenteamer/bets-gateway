export default `
  type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(id: ID!): Boolean!
    updateMessage(id: ID!, text: String!): Boolean!
  }
`;
