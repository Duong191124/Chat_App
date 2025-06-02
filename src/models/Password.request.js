module.exports = (sequelize, DataTypes) => {
  const PasswordRequest = sequelize.define(
    "PasswordRequest",
    {
      is_expired: { type: DataTypes.DATE },
      reset_code: { type: DataTypes.STRING },
      status: { type: DataTypes.BOOLEAN },
    },
    {
      tableName: "password_request",
      timestamps: false,
    }
  );
  PasswordRequest.associate = (models) => {
    PasswordRequest.hasOne(models.User, {
      foreignKey: "password_request_id",
      as: "user",
    });
  };

  return PasswordRequest;
};
