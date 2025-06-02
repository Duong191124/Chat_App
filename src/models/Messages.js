module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      channel_id: { type: DataTypes.INTEGER, allowNull: false },
      sender_id: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "messages",
      timestamps: false,
    }
  );

  Message.associate = (models) => {
    Message.belongsTo(models.Channel, { foreignKey: "channel_id" });
    Message.belongsTo(models.User, { foreignKey: "sender_id" });
  };

  return Message;
};
