import 'dotenv/config';
import Sequelize from 'sequelize';


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
  Bet: sequelize.import('./bet'),
  BetResult: sequelize.import('./betResult'),
};

Object.keys(models).forEach(key => {
  if('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
