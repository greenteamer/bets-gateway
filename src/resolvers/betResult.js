import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { get } from 'lodash';

import { isAdmin, authByRoles } from './authorization';
import { ROLES } from '../constants';


export default {
  Query: {
    betResult: async (parent, { id }, { models }) => {
      return await models.BetResult.findById(id);
    },
  },

  Mutation: {
    createBetResult: async (parent, { betId, result }, { models }) => {
      const betResult = await models.BetResult.create({ result });
      const bet = await models.Bet.findById(betId);
      bet.setBetResult(betResult);
      return betResult;
    }
  },
}