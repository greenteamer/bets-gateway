import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';
import { ApolloServer, gql } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';


const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users ? models.users[1] : null,
  }
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      createUsersWithMessages();
    }
    app.listen({ port: 5000 }, () => {
      console.log('Apollo Server on http://localhost:5000/graphql');
    });
  });

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'rwieruch',
      messages: [
        {
          text: 'Published the Road to learn React',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
        },
        {
          text: 'Published a complete ...',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
}
