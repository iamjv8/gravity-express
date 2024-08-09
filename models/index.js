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

db.category.hasMany(db.transaction);
db.transaction.belongsTo(db.category);

db.type.hasMany(db.transaction);
db.transaction.belongsTo(db.type);

db.users.hasMany(db.transaction);
db.transaction.belongsTo(db.users);

//exporting the module
module.exports = db;
