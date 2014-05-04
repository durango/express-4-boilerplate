module.exports = function(sequelize, DataType) {
  var User = sequelize.define('User', {
    email:      DataType.STRING,
    first_name: DataType.STRING,
    last_name:  DataType.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.UserPassport, {foreignKey: 'user_id'});
      }
    },
    instanceMethods: {
      name: function() {
        return [this.first_name, this.last_name].join(' ');
      }
    },
    tableName:   'users',
    underscored: true
  });

  return User;
}
