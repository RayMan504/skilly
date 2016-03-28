module.exports = function (sequelize, Datatypes) {
    return sequelize.define('creds', {
        // idUser is primary key and foreign to user
        idUser: {
          type: Datatypes.INTEGER(10),
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        hash: {
            type: Datatypes.STRING,
            allowNull: false,
            primaryKey: false
        },
        salt: {
            type: Datatypes.STRING,
            allowNull: false,
            primaryKey: false
        }
    }, {
    tableName: 'creds',
    freezeTableName: true
  });
}