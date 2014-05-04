module.exports = function(sequelize, DataType) {
  var UserPassport = sequelize.define('UserPassport', {
    method: DataType.STRING,
    token:  DataType.STRING,
    secret: DataType.STRING
  }, {
    classMethods: {
      associate: function(models) {
        UserPassport.belongsTo(models.User);
      }
    },
    tableName: 'user_passports',
    underscore: true
  });

  return UserPassport;
}
