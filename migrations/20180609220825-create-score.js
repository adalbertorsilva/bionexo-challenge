'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Scores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      size: {
        type: Sequelize.INTEGER
      },
      adaptation_for_seniors: {
        type: Sequelize.INTEGER
      },
      medical_equipment: {
        type: Sequelize.INTEGER
      },
      medicine: {
        type: Sequelize.INTEGER
      },
      ubs_id: {
        type: Sequelize.INTEGER
      }
    })
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Scores')
  }
}
