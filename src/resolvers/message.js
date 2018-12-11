import uuidv4 from 'uuid/v4'; 


export const messageQuery = {
  messages: (parent, args, { models }) => {
    return Object.values(models.messages);
  },
  message: (parent, { id }, { models }) => {
    return models.messages[id];
  },
};

export const messageMutation = {
  createMessage: (parent, { text }, { models, me }) => {
    const id = uuidv4();
    const message = {
      id,
      text,
      userId: me.id,
    }

    models.messages[id] = message;
    models.users[me.id].messageIds.push(id);

    return message;
  },
  deleteMessage: (parent, { id }, { models, me }) => {
    const { [id]: message, ...otherMessages } = models.messages;

    if (!message) {
      return false;
    }

    models.messages = otherMessages;

    return true;
  },
  updateMessage: (parent, { id, text }, { models, me }) => {
    const { [id]: message, ...otherMessages } = models.messages;
    if (message.userId !== me.id) {
      return false;
    }
    message.text = text;
    return true;
  },
};

export const messageFields = {
  user: (message, args, { models }) => {
    return models.users[message.userId];
  },
};