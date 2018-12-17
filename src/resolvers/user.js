import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';

import { isAdmin, authByRoles } from './authorization';
import { ROLES } from '../constants';


const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role, agentId } = user;
  return await jwt.sign({ id, email, username, role, agentId }, secret, {
    expiresIn,
  });
};

export default {
  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id,
        }
      });
    },
    players: async (user, args, context) => {
      return await user.getPlayers();
    },
    bets: async (user, args, context) => {
      return await user.getBets();
    },
  },

  Query: {
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      return await models.User.findById(me.id);
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
  },

  Mutation: {
    signUp: combineResolvers( 
      authByRoles([ROLES.AGENT, ROLES.ADMIN]),
      async (
        parent,
        { username, email, password, role, agentId },
        { models, secret },
      ) => {
        const result = await models.User.create({ username, email, password, role, agentId });
        if (result && result.dataValues) {
          const { id, username, email, agentId } = result.dataValues;
          return {
            id,
            agentId,
            username,
            email,
            role,
          };
        }
      },
    ),

    signIn: async (
      parent,
      { login, password },
      { models, secret }
    ) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError(
          'No user found with this login credentials.',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }
      const token = createToken(user, secret, '1d');
      // const decrypted = jwt.valid
      // console.log('>>>> user: ', { user })

      return {
        token,
        me: user,
      };
    },

    deleteUser: combineResolvers( 
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: { id },
        });
      },
    ),
  },
};
