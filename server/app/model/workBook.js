'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE, DataTypes } = app.Sequelize;

  const WorkBook = app.model.define('work-book', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: STRING, defaultValue: 'Sheet1' },
    owner: { type: STRING, allowNull: false },
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

  WorkBook.associate = function() {

  };
  return WorkBook;
};
