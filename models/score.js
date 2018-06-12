'use strict'
const {Model, DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  class Score extends Model {
    static init (sequelize) {
      return super.init({
        size: DataTypes.INTEGER,
        adaptation_for_seniors: DataTypes.INTEGER,
        medical_equipament: DataTypes.INTEGER,
        medicine: DataTypes.INTEGER,
        ubs_id: DataTypes.INTEGER
      }, {sequelize, underscored: true, timestamps: false})
    }

    static associate (models) {
      this.belongsTo(models.UBS, {as: 'ubs', foreignKey: 'ubs_id'})
    }
  }

  return Score
}
