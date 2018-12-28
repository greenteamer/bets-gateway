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
    createBet: async (
      parent,
      {
        input: {
          userId,
          creatorId,
          amount,
          eventId,
          siteKey,
          oddType,
          oddIndex,
          team,
        },
      },
      { models, me }
    ) => {
      console.log('>>> create Bet mutation: ', { userId, creatorId: me.id, amount, eventId, siteKey, oddIndex, oddType, team });
      const bet = models.Bet.build({
        userId,
        creatorId: me.id,
        amount,
        eventId,
        siteKey,
        oddIndex,
        oddType,
        team,
      });
      const user = await models.User.findById(userId);
      if (user.available > amount) {
        await user.update({ available: user.available - amount });
        await bet.save();
        console.log('>>> user: ', { user: user })
        return user;
      }
      throw Error('You have insufficient funds');
    }
  },
}