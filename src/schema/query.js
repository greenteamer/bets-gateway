export default `
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
    messages: [Message!]!
    message(id: ID!): Message!
  }
`;