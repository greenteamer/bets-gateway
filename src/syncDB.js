import models, { sequelize } from './models';
import { ROLES } from './constants';


export const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: 'aleks',
      email: 'teamer777@gmail.com',
      password: 'qweqwe123',
      role: ROLES.ADMIN,
      messages: [
        {
          text: 'Admin message',
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'agent',
      email: 'hello@robin.com',
      password: 'rwieruch',
      role: ROLES.AGENT,
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
      username: 'player',
      email: 'hello@david.com',
      password: 'ddavids',
      role: ROLES.PLAYER,
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