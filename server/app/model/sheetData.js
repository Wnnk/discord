'use strict';

module.exports = app => {
  const { INTEGER, DataTypes, STRING } = app.Sequelize;

  const SheetData = app.model.define('sheet-data', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    sheet_Id: { type: INTEGER, allowNull: false },
    r: { type: INTEGER, allowNull: false },
    c: { type: INTEGER, allowNull: false },
    v: { type: DataTypes.JSON },
    index: { type: STRING },
  });
  SheetData.associate = function() {
    SheetData.belongsTo(app.model.Sheet, { foreignKey: 'sheet_Id', targetKey: 'id', as: 'SheetInfo' });
  };
  return SheetData;
};
