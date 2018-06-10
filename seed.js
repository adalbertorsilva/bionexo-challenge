const csvToJson = require('csvtojson')

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
    cityCode: ubs.cod_munic,
    phone: ubs.dsc_telefone,
    geocode: {
      lat: ubs.vlr_latitude,
      long: ubs.vlr_longitude
    },
    scores: {
      size: rankValue(ubs.dsc_estrut_fisic_ambiencia),
      adaptation_for_seniors: rankValue(ubs.dsc_adap_defic_fisic_idosos),
      medical_equipament: rankValue(ubs.dsc_equipamentos),
      medicine: rankValue(ubs.dsc_medicamentos)
    }
  }
}

module.exports = () => {
  return csvToJson().fromFile('ubs.csv')
    .then(json => {
      return json.map(ubs => mapUbsObject(ubs))
    })
}
