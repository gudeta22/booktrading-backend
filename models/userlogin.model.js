const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("bookstore", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL database connected");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define("userlogin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});

sequelize.sync().then(() => {
   console.log('user table creasted successfully!');
}).catch((error) => {
   console.error('Unable to create user table : ', error);
});

module.exports = User;
