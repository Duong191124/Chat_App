module.exports = (sequelize, DataTypes) => {
  const ServerMember = sequelize.define(
    "ServerMember",
    {
      server_id: { type: DataTypes.INTEGER, allowNull: false },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      role: {
        type: DataTypes.ENUM("owner", "admin", "member"),
        defaultValue: "member",
      },
      joined_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "server_members",
      timestamps: false,
    }
  );

  ServerMember.associate = (models) => {
    ServerMember.belongsTo(models.Server, { foreignKey: "server_id" });
    ServerMember.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return ServerMember;
};
