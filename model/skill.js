'use strict';

module.exports = function (sequelize, Datatypes) {
    return sequelize.define('skill', {
        skillid: {
            type: Datatypes.INTEGER(10),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING,
            allowNull: true,
            primaryKey: false
        }
    }, {
    tableName: 'skill',
    freezeTableName: true
  });
}
