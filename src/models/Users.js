const Users = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: true },
      avatar_url: { type: DataTypes.STRING },
      display_name: { type: DataTypes.STRING, unique: true, allowNull: false },
      password_request_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "password_request",
          key: "id",
        },
      },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "users",
      timestamps: false,
      modelName: "User",
    }
  );

  User.associate = (models) => {
    User.hasMany(models.Server, { foreignKey: "owner_id" });
    User.hasMany(models.Message, { foreignKey: "sender_id" });
    User.hasMany(models.Relationship, {
      foreignKey: "userId",
      as: "relationships",
    });
    User.belongsToMany(models.Server, {
      through: models.ServerMember,
      foreignKey: "user_id",
    });
  };

  return User;
};

module.exports = Users;
