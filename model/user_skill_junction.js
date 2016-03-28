'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_skill_junction', {
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'user',
        key: 'userid'
      }
    },
    skillId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'skill',
        key: 'skillid'
      },
    }
  }, {
    tableName: 'user_skill_junction',
    freezeTableName: true
  });
};
