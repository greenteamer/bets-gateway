import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { get, filter } from 'lodash';

import { isAdmin, authByRoles } from './authorization';
import { ROLES } from '../constants';
import odds from '../mock/odds';


export default {
  Query: {
    odds: async (parent, { sport_key }, { models }) => {
      return await filter(odds.data, odd => odd.sport_key === sport_key);
    },
  },
}