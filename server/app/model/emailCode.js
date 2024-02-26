'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const EmailCode = app.model.define('email-code', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    email: STRING(255),
    code: STRING(10),
    expiration_time: DATE,
    create_time: DATE,
  });
  EmailCode.associate = function() {
  };

  return EmailCode;
};
