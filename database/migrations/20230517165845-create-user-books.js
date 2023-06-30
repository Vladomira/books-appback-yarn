"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.createTable("UserBooks", {
         id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         bookId: {
            type: Sequelize.STRING,
         },
         userId: {
            type: Sequelize.STRING,
         },
         author: {
            type: Sequelize.STRING,
         },
         title: {
            type: Sequelize.STRING,
         },
         image: {
            type: Sequelize.TEXT,
         },
         favorite: {
            type: Sequelize.BOOLEAN,
         },
         finished: {
            type: Sequelize.BOOLEAN,
         },
         inProgress: {
            type: Sequelize.BOOLEAN,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
         },
      });
   },
   async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("UserBooks");
   },
};
