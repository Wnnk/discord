'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { STRING, DATE, DataTypes } = Sequelize;
    await queryInterface.createTable('reply', {
      id: {
        type: STRING(20),
        primaryKey: true,
      },
      content: STRING,
      create_time: DATE,
      update_time: DATE,
      user_id: STRING(20),
      post_id: STRING(20),
      parent_reply_id: STRING(20),
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  },
};
