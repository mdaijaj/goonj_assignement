module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      address_city: {
        type: Sequelize.STRING,
      },
      company_name: {
        type: Sequelize.STRING,
      }
    });
  
    return User;
  };
  