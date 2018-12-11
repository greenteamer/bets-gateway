import { gql } from 'apollo-server-express';


import userType from './user';
import messageType from './message';
import queryType from './query';
import mutationType from './mutation';

export default gql`
  ${userType}
  ${messageType}
  ${queryType}
  ${mutationType}
`;
