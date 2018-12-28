export default (sequelize, DataTypes) => {
  const Bet = sequelize.define('bet', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    creatorId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    siteKey: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    oddType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    oddIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

    // id: ID!
    // userId: ID!
    // creatorId: ID!
    // amount: Int!
    // eventId: ID!
    // result: BetResult
    // siteKey: String!
    // oddType: String!
    // oddIndex: Int!
    // team: String!

  Bet.associate = models => {
    Bet.belongsTo(models.User);
    Bet.belongsTo(models.BetResult);
  }

  return Bet;
}