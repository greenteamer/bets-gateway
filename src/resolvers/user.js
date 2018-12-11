export const userQuery = {
  me: (parent, args, { me }) => {
    return me;
  },
  user: (parent, { id }, { models }) => {
    return models.users[id];
  },
  users: (parent, args, { models }) => {
    return Object.values(models.users);
  },
};

export const userFields = {
  username: user => `${user.firstName} ${user.lastName}`,
  messages: (user, args, { models }) => {
    const m = Object.values(models.messages).filter(message => user.messageIds.includes(message.id));
    return m;
  },
};
