'use strict'
const {Model, DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  class Geocode extends Model {
    static init (sequelize) {
      return super.init({
        point: DataTypes.GEOMETRY('POINT'),
        ubs_id: DataTypes.INTEGER
      }, {sequelize, underscored: true, timestamps: false})
    }

    static associate (models) {
      this.belongsTo(models.UBS, {as: 'ubs', foreignKey: 'ubs_id'})
    }
  }
  return Geocode
}
