import { ForbiddenError } from 'apollo-server';
import { skip, combineResolvers } from 'graphql-resolvers';
import { ROLES } from '../constants';


export const isAuthenticated = (parent, args, { me }) => ( 
  me ? skip : new ForbiddenError('Not authorized as user.')
);

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role }}) => (
    role === ROLES.ADMIN ? skip : new ForbiddenError('Not authorized as admin.')
  ),
);

export const authByRoles = rolesList => combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role }}) => { 
    if (rolesList.includes(role)) return skip;
    return new ForbiddenError('Not permited for your role.')
  },
);

export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findById(id, { raw: true });

  if (message.userId !== me.id) {
    return new ForbiddenError('Not authorized as owner.');
  }

  return skip;
}
