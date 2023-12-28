'use strict';


module.exports = {

  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DataTypes, STRING } = Sequelize;
    await queryInterface.createTable('sheet-data', {
      id: { type: INTEGER, autoIncrement: true, primaryKey: true },
      sheet_Id: { type: INTEGER, allowNull: false },
      r: { type: INTEGER, allowNull: false },
      c: { type: INTEGER, allowNull: false },
      v: { type: DataTypes.JSON },
      index: { type: STRING },
    });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('sheet-data');
  },
};
