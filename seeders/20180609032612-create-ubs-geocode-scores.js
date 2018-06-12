'use strict'
const csvToJson = require('csvtojson')
const models = require('../models')

const rankValue = (value) => {
  switch (value) {
    case 'Desempenho muito acima da média':
      return 3
    case 'Desempenho acima da média':
      return 2
    case 'Desempenho mediano ou  um pouco abaixo da média':
      return 1
  }
}

const mapUbsObject = (ubs) => {
  return {
    name: ubs.nom_estab,
    address: ubs.dsc_endereco,
    city: ubs.dsc_cidade,
    phone: ubs.dsc_telefone,
    geocode: {
      point: {
        type: 'Point',
        coordinates: [ubs.vlr_longitude, ubs.vlr_latitude] }
    },
    scores: {
      size: rankValue(ubs.dsc_estrut_fisic_ambiencia),
      adaptation_for_seniors: rankValue(ubs.dsc_adap_defic_fisic_idosos),
      medical_equipament: rankValue(ubs.dsc_equipamentos),
      medicine: rankValue(ubs.dsc_medicamentos)
    }
  }
}

const findPersistedUbs = (UBSs, data) => {
  return UBSs.find(basicUnit => {
    return basicUnit.name === data.name &&
      basicUnit.address === data.address &&
      basicUnit.city === data.city &&
      basicUnit.phone === data.phone
  })
}

const formatAssociatedDataToPersist = (rawData, persistedUBSs, field) => {
  return rawData.map(data => {
    const ubs = findPersistedUbs(persistedUBSs, data)
    data[field].ubs_id = ubs.id
    return data[field]
  })
}

module.exports = {
  up: async () => {
    console.log('Initializing seed...')
    const ubsJson = await csvToJson().fromFile('ubs.csv')
    const rawData = ubsJson.map(ubs => mapUbsObject(ubs))
    console.log('Persisting UBSs...')
    await models.UBS.bulkCreate(rawData, {raw: true})
    const persistedUBSs = await models.UBS.findAll()

    const geocodes = formatAssociatedDataToPersist(rawData, persistedUBSs, 'geocode')
    const scores = formatAssociatedDataToPersist(rawData, persistedUBSs, 'scores')

    console.log('Persisting Geocodes...')
    await models.Geocode.bulkCreate(geocodes, {raw: true})
    console.log('Persisting Scores...')
    await models.Score.bulkCreate(scores, {raw: true})

    console.log('Seed finished...')
  },
  down: async () => {
    await models.Score.destroy({where: {}})
    await models.Geocode.destroy({where: {}})
    await models.UBS.destroy({where: {}})
  }
}
