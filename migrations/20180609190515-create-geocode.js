'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Geocodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      point: {
        type: Sequelize.GEOMETRY('POINT')
      },
      ubs_id: {
        type: Sequelize.INTEGER
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Geocodes')
  }
}
