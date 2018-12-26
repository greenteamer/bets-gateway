export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    text: {
      type: DataTypes.STRING,
      validate: { notEmpty: true },
    }
  });

  Message.associate = models => {
    Message.belongsTo(models.User);
  };

  return Message;
}
