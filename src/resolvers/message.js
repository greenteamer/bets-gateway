import uuidv4 from 'uuid/v4';
import { isAuthenticated, isMessageOwner } from './authorization';
import { combineResolvers } from 'graphql-resolvers';


export default {
  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findById(message.userId);
    },
  },

  Query: {
    // messages: async (parent, args, { models }) => {
    //   return await models.Message.findAll();
    // },
    messages: combineResolvers(
      isAuthenticated,
      async (parent, args, { models }) => {
        console.log('>>> mes')
        return await models.Message.findAll();
      },
    ),
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const newMessage = await models.Message.create({
          text,
          userId: me.id,
        });
        const user = models.User.findById(me.id);
        return {
          message: newMessage,
          me: user,
        }
      },
    ),
    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models, me }) => {
        return await models.Message.destroy({ where: { id }});
      },
    ),
    updateMessage: combineResolvers( 
      isAuthenticated,
      isMessageOwner,
      async (parent, { id, text }, { models, me }) => {
        const result = await models.Message.update({
            text,
          },
          {
            where: { id },
            returning: true,
            plain: true,
          }
        );
        if (result && result[1]) {
          return result[1].dataValues;
        }
        return null;
      },
    ),
  }
};
