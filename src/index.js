import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';
import { createUsersWithMessages, populateSportsDB, populateOddsDB } from './syncDB';


const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors());

const getMe = async req => {
  const token = req.headers['authorization'];

  if (token) {
    try {
      const me = await jwt.verify(token, process.env.SECRET);
      return me;
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me,
      secret: process.env.SECRET,
    };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      createUsersWithMessages(new Date());
      populateSportsDB();
      populateOddsDB();
    }
    app.listen({ port: 5000 }, () => {
      console.log('Apollo Server on http://localhost:5000/graphql');
    });
  });
