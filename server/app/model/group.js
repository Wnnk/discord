'use strict';
const moment = require('moment');

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Group = app.model.define('group', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    group_name: STRING,
    group_owner: {
      type: STRING(36),
      allowNull: false,
    },
    create_time: {
      type: DATE,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('create_time');
        return rawValue ? rawValue.toISOString().replace(/T/, ' ').replace(/\..+/, '') : null;
      },
      defaultValue: moment(),
    },
    iconpath: {
      type: STRING,
      allowNull: false,
    },
    default_channel: {
      type: STRING(20),
    },
  });

  Group.associate = function() {
    // Group.hasMany(app.model.GroupMember, { foreignKey: 'group_id', targetKey: 'id' });
  };
  return Group;
};
