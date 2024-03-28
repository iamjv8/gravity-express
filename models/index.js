const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log("Error in connection: ", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require("./userModel")(sequelize, DataTypes);
db.type = require("./typeModel")(sequelize, DataTypes);
db.category = require("./categoryModel")(sequelize, DataTypes);
db.transaction = require("./transactionModel")(sequelize, DataTypes);

db.category.hasMany(db.transaction, {
  foreignKey: "id",
  as: "category",
});
db.transaction.belongsTo(db.category, { as: "category", foreignKey: "id" });

//exporting the module
module.exports = db;
