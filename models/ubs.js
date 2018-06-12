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

    static paginateResult (resultData, params) {
      const paginationBegin = (params.page - 1) * params.per_page
      const paginationEnd = paginationBegin + params.per_page
      return resultData[0].slice(paginationBegin, paginationEnd)
    }

    static responseObject (resultData, params) {
      const paginatedResult = UBS.paginateResult(resultData, params)
      const entries = paginatedResult.map(entry => {
        return {
          id: entry.id,
          name: entry.name,
          address: entry.address,
          city: entry.city,
          phone: entry.phone,
          geocode: {
            lat: entry.point.coordinates[1],
            long: entry.point.coordinates[0]
          },
          scores: {
            size: entry.size,
            adaptation_for_seniors: entry.adaptation_for_seniors,
            medical_equipament: entry.medical_equipament,
            medicine: entry.medicine
          }
        }
      })

      return {
        current_page: params.page,
        per_page: params.per_page,
        total_entries: resultData[0].length,
        entries
      }
    }

    static async findNotifiedAreas (params) {
      const resultData = await sequelize.query('SELECT * FROM "UBs" AS ubs JOIN "Geocodes" AS geocode ON (ubs.id = geocode.ubs_id) JOIN "Scores" AS score ON (ubs.id = score.ubs_id) WHERE ST_DWithin(geocode.point::geography, ST_MakePoint(:longitude,:latitude)::geography, 10000) ORDER BY ubs.id', {replacements: { longitude: params.coordinates.long, latitude: params.coordinates.lat }})
      console.log('RESULTADO -----------------------> ', resultData[0][0])
      return UBS.responseObject(resultData, params)
    }
  }

  return UBS
}
