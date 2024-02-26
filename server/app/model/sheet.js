'use strict';
const moment = require('moment');
module.exports = app => {
  const { INTEGER, DATE, DataTypes } = app.Sequelize;

  const Sheet = app.model.define('sheet', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    workbook_id: { type: INTEGER, allowNull: false },
    option: { type: DataTypes.JSON },
    create_time: {
      type: DATE,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('create_time');
        return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
      },
      defaultValue: moment(),
    },
    update_time: {
      type: DATE,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('update_time');
        return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
      },
      defaultValue: moment(),
    },
  });

  Sheet.associate = function() {
    Sheet.hasMany(app.model.SheetData, { foreignKey: 'sheet_Id', targetKey: 'id', as: 'celldata' });

  };

  return Sheet;
};
