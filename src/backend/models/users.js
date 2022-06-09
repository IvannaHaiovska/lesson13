module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    username: {
      type: Sequelize.STRING,
      required: true
    },
    email: {
      type: Sequelize.STRING,
      required: true
    },
    password: {
      type: Sequelize.STRING,
      required: true
    },
    createdAt: {
      allowNull: false,
      defaultValue: new Date,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      defaultValue: new Date,
      type: Sequelize.DATE
    }
  });
  return Users;
};
