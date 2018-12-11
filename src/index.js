import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import { ApolloServer, gql } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';


const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1],
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 5000 }, () => {
  console.log('Apollo Server on http://localhost:5000/graphql');
});
