import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { get } from 'lodash';

import { isAdmin, authByRoles } from './authorization';
import { ROLES } from '../constants';


export default {
  Bet: {
    result: async (bet, args, context) => {
      return await bet.getBetResult();
    },
  },

  Query: {
    bet: async (parent, { id }, { models }) => {
      return await models.Bet.findById(id);
    },
  },

  Mutation: {
    createBet: async (parent, { userId, creatorId, amount, eventId }, { models }) => {
      return await models.Bet.create({ userId, creatorId, amount, eventId });
    }
  },
}