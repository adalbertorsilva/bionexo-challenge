'use strict'
const {Model, DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  class UBS extends Model {
    static init (sequelize) {
      return super.init({
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        city: DataTypes.STRING,
        phone: DataTypes.STRING
      }, {sequelize, underscored: true, timestamps: false})
    }

    static associate (models) {
      this.hasOne(models.Geocode, {as: 'geocode', foreignKey: 'ubs_id', onDelete: 'CASCADE'})
      this.hasOne(models.Score, {as: 'scores', foreignKey: 'ubs_id', onDelete: 'CASCADE'})
    }
  }

  return UBS
}
