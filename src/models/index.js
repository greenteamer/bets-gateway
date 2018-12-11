import 'dotenv/config';
import Sequelize from 'sequelize';

console.log('>>>>>>> psql: ', {
  name: process.env.DATABASE,
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
})

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false,
  },
);

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach(key => {
  if('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
