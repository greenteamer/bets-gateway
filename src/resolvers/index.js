import { userQuery, userFields } from './user';
import { messageQuery, messageMutation, messageFields } from './message';


const resolvers = {
  Query: {
    ...userQuery,
    ...messageQuery,
  },

  Mutation: {
    ...messageMutation,
  },

  User: {
    ...userFields,
  },

  Message: {
    ...messageFields,
  }
};

export default resolvers;