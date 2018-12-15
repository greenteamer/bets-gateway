import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';

import { isAdmin } from './authorization';
import { ROLES } from '../constants';


const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign({ id, email, username, role }, secret, {
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
    players: async (user, args, { models }) => {
      return await models.User.findAll({
        where: {
          role: ROLES.PLAYER,
        }
      });
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
    signUp: async (
      parent,
      { username, email, password, role },
      { models, secret },
    ) => {
      const result = await models.User.create({ username, email, password, role });
      if (result && result.dataValues) {
        const { id, username, email } = result.dataValues;
        // console.log('>>>> create user resolver user: ', { id, username, email });
        // return { token: createToken({ id, username, email, role }, secret, '20m') };
        return {
          id,
          username,
          email,
          role,
        };
      }
    },

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

      return {
        token: createToken(user, secret, '1d'),
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
