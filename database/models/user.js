"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   class User extends Model {
      static associate(models) {
         User.hasMany(models.UserBooks, { foreignKey: "userId" });
         User.hasMany(models.UserNotes, { foreignKey: "userId" });
      }
   }
   User.init(
      {
         name: DataTypes.STRING,
         email: {
            type: DataTypes.STRING,
            validate: {
               isEmail: true,
            },
         },
         password: DataTypes.STRING,
         accessToken: DataTypes.STRING,
         refreshToken: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "User",
      }
   );
   return User;
};
