const { UBS } = require('../models')
const seeder = require('../seeders/20180609032612-create-ubs-geocode-scores')

module.exports = async () => {
  const resultCount = await UBS.findAndCountAll()

  if (resultCount.count === 0) {
    await seeder.up()
  }
}
