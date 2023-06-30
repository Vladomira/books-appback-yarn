"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class UserBooks extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {}
   }
   UserBooks.init(
      {
         bookId: DataTypes.STRING,
         userId: DataTypes.STRING,
         author: DataTypes.STRING,
         title: DataTypes.STRING,
         image: DataTypes.TEXT,
         favorite: DataTypes.BOOLEAN,
         finished: DataTypes.BOOLEAN,
         inProgress: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         modelName: "UserBooks",
      }
   );
   return UserBooks;
};
