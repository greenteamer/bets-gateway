import userResolvers from './user';
import messageResolvers from './message';
import betResolvers from './bet';
import betResultResolvers from './betResult';
import sportResolvers from './sport';
import oddResolvers from './odd';
import { GraphQLDateTime } from 'graphql-iso-date';

const customScalarResolver = {
  Date: GraphQLDateTime,
};

export default [
  customScalarResolver,
  userResolvers,
  messageResolvers,
  betResolvers,
  betResultResolvers,
  sportResolvers,
  oddResolvers,
];
