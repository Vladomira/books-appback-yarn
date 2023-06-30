"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class UserNotes extends Model {
      static associate(models) {
         UserNotes.belongsTo(models.User, { foreignKey: "userId" });
         UserNotes.belongsTo(models.UserBooks, { foreignKey: "bookId" });
      }
   }
   UserNotes.init(
      {
         bookId: DataTypes.STRING,
         userId: DataTypes.STRING,
         chapter: DataTypes.STRING,
         text: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: "UserNotes",
      }
   );
   return UserNotes;
};
