'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const GroupMember = app.model.define('group-member', {
    id: { type: INTEGER, autoIncrement: true, primaryKey: true },
    group_id: INTEGER,
    member_id: STRING(36),
    type: INTEGER(10), // 1:群主   2:管理员   0: 普通成员
  });

  GroupMember.associate = function() {
    // GroupMember.belongsTo(app.model.Group, { foreignKey: 'group_id', sourceKey: 'uuid' });
    GroupMember.belongsTo(app.model.User, { foreignKey: 'member_id', targetKey: 'uuid', as: 'memberInfo' });

  };

  return GroupMember;
};
