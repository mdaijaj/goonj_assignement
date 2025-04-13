module.exports = (sequelize, Sequelize) => {
    const Volenteers = sequelize.define("volenteer", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Volunteer_ID: {
        type: Sequelize.STRING,
      },
      Name: {
        type: Sequelize.STRING,
      },
      City: {
        type: Sequelize.STRING,
      },
      Hours: {
        type: Sequelize.NUMBER,
      },
      Date: {
        type: Sequelize.STRING,
      }
    });
  
    return Volenteers;
  };
  