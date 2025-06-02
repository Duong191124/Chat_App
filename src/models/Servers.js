module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define(
    "Server",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      owner_id: { type: DataTypes.INTEGER },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "servers",
      timestamps: false,
    }
  );

  Server.associate = (models) => {
    Server.belongsTo(models.User, { foreignKey: "owner_id" });
    Server.hasMany(models.Channel, { foreignKey: "server_id" });
    Server.belongsToMany(models.User, {
      through: models.ServerMember,
      foreignKey: "server_id",
    });
  };

  return Server;
};
