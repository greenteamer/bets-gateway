import models, { sequelize } from './models';
import { ROLES } from './constants';


export const createUsersWithMessages = async date => {
  await models.User.create(
    {
      username: 'admin',
      email: 'teamer777@gmail.com',
      password: 'qweqwe123',
      role: ROLES.ADMIN,
      messages: [
        {
          text: 'Admin message',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  const agent = await models.User.create(
    {
      username: 'agent',
      email: 'hello@robin.com',
      password: 'qweqwe123',
      role: ROLES.AGENT,
      messages: [
        {
          text: 'Published the Road to learn React',
          createdAt: date.setSeconds(date.getSeconds() + 1),
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
      password: 'qweqwe123',
      role: ROLES.PLAYER,
      agentId: agent.id,
      messages: [
        {
          text: 'Happy to release ...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
        {
          text: 'Published a complete ...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'player2',
      email: 'hello2@david.com',
      password: 'qweqwe123',
      role: ROLES.PLAYER,
    }
  );

  await models.User.create(
    {
      username: 'player3',
      email: 'hello3@david.com',
      password: 'qweqwe123',
      role: ROLES.PLAYER,
      agentId: agent.id,
    }
  );
}