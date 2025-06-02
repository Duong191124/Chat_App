module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define(
    "Channel",
    {
      name: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.ENUM("text", "voice"), defaultValue: "text" },
      server_id: { type: DataTypes.INTEGER, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "channels",
      timestamps: false,
    }
  );

  Channel.associate = (models) => {
    Channel.belongsTo(models.Server, { foreignKey: "server_id" });
    Channel.hasMany(models.Message, { foreignKey: "channel_id" });
  };

  return Channel;
};
