'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const UserLogin = app.model.define('user_login', {
    uuid: { type: INTEGER(20), primaryKey: true },
    user_email: STRING,
    user_password: STRING,
    salt: STRING,
    status: INTEGER(20),
  });

  return UserLogin;
};
