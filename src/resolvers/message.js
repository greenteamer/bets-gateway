import uuidv4 from 'uuid/v4'; 


export default {
  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findById(message.userId);
    },
  },

  Query: {
    messages: async (parent, args, { models }) => {
      return await models.Message.findAll();
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    },
  },

  Mutation: {
    createMessage: async (parent, { text }, { models, me }) => {
      try {
        return await models.Message.create({
          text,
          userId: me.id,
        });
      } catch(error) {
        throw new Error(error);
      }
    },
    deleteMessage: async (parent, { id }, { models, me }) => {
      return await models.Message.destroy({ where: { id }});
    },
    updateMessage: async (parent, { id, text }, { models, me }) => {
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
  }
};
