'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const WorkBookMember = app.model.define('workbook-member', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    workbook_id: { type: INTEGER, allowNull: false },
    uuid: { type: STRING },
  });

  WorkBookMember.associate = function() {

  };
  return WorkBookMember;
};
