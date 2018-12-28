import { AuthenticationError, UserInputError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { get } from 'lodash';

import { isAdmin, authByRoles } from './authorization';
import { ROLES } from '../constants';
import sports from '../mock/sports';


export default {
  Query: {
    sports: async (parent, args, { models }) => {
      // return await sports.data;
      return await models.Sport.findAll();
    },
  },
}