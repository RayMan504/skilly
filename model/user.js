'use strict';

module.exports = function(sequelize, Datatypes) {
    return sequelize.define('user', {
        userId: {
            type: Datatypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        nameLast: {
            type: Datatypes.STRING,
            allowNull: true,
            primaryKey: false,
        },
        nameFirst: {
            type: Datatypes.STRING,
            allowNull: true,
            primaryKey: false
        },
        age: {
            type: Datatypes.INTEGER(11),
            allowNull: false,
            primaryKey: false
        }
    }, {
    tableName: 'user',
    freezeTableName: true
  });
};
