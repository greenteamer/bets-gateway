export default {
  User: {
    // username: user => `${user.firstName} ${user.lastName}`,
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id,
        }
      });
    },
  },

  Query: {
    me: async (parent, args, { me }) => {
      return await models.User.findById(me.id);
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
  }
}
