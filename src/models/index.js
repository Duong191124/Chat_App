const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

// Đọc tất cả các file trong folder models, bỏ qua index.js
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"))
  .forEach((file) => {
    // Import model function (Users.js export là function)
    const modelFunc = require(path.join(__dirname, file));
    // Gọi hàm đó truyền sequelize và DataTypes
    const model = modelFunc(sequelize, Sequelize.DataTypes);
    // Gán vào db với key là tên model
    db[model.name] = model;
  });

// Nếu có associate thì gọi associate
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
