module.exports = (sequelize, Sequelize) => {
    const Donation = sequelize.define("donation", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Donation_ID: {
        type: Sequelize.STRING,
      },
      Donor_Name: {
        type: Sequelize.STRING,
      },
      City: {
        type: Sequelize.STRING,
      },
      Amount: {
        type: Sequelize.FLOAT,
      },
      Date: {
        type: Sequelize.STRING,
      }
    });
  
    return Donation;
  };
  