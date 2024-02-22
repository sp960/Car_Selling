'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the column
    await queryInterface.removeColumn('cars', 'owner_id');
  },

  down: async (queryInterface, Sequelize) => {
    // Add the column back (if needed)
    // await queryInterface.addColumn('TableName', 'columnName', {
    //   type: Sequelize.STRING
    // });
  }
};
