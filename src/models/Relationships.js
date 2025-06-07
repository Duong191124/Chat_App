module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define(
    "Relationship",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      targetUserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "friend", "blocked"),
        allowNull: false,
        defaultValue: "pending",
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["userId", "targetUserId"],
        },
      ],
    }
  );

  return Relationship;
};
