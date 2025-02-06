// Define the Users model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  first_name: {
    type: DataTypes.STRING
  },
  last_name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  phone_number: {
    type: DataTypes.STRING
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'roles', // Name of the referenced table
      key: 'id' // Primary key of the referenced table
    }
  },
  lastloginDate: {
    type: DataTypes.DATE
  },
  CreatedTimestamp: {
    type: DataTypes.DATE
  }
}, {
  timestamps: false, // Disable automatic timestamps
  tableName: 'users' // Name of the table in the database
});

// Define associations with other models if needed

// Export the User model
module.exports = User;
