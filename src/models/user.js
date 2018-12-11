const user = (sequelize, DataType) => {
  const User = sequelize.define('user', {
    username: {
      type: DataType.STRING,
    },
  });

  User.associate = models => {
    User.hasMany(models.Message, { onDelete: 'CASCADE' });
  };

  return User;
}

export default user;
