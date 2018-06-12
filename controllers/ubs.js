'use strict'
const autoBind = require('auto-bind')
const { missing_coordinate_error: MissingCoordinateError,
  surplus_coordinate_error: SurplusCoordinateError,
  invalid_coordinate_error: InvalidCoordinateError,
  invalid_param_error: InvalidParamError } = require('../errors')

const { UBS } = require('../models')

class UBSController {
  constructor () {
    autoBind(this)
  }

  getCoordinates (coordinatesParam) {
    const coordinatesArray = coordinatesParam.split(',')

    coordinatesArray.forEach(coordinate => {
      if (isNaN(Number(coordinate))) {
        throw new InvalidCoordinateError()
      }
    })

    if (coordinatesArray.length < 2) {
      throw new MissingCoordinateError()
    }

    if (coordinatesArray.length > 2) {
      throw new SurplusCoordinateError()
    }

    return {
      lat: coordinatesArray[0],
      long: coordinatesArray[1]
    }
  }

  isStringNullOrEmpty (value) {
    return value === null || value.trim() === ''
  }

  getParamValue (param, defaultValue, desiredValue) {
    const obj = {}
    obj[param] = desiredValue || defaultValue

    if (isNaN(Number(obj[param])) || this.isStringNullOrEmpty(param)) {
      throw new InvalidParamError()
    }

    obj[param] = parseInt(obj[param])
    return obj
  }

  getParamsObject (params) {
    return {
      coordinates: this.getCoordinates(params.query),
      ...this.getParamValue('page', 1, params.page),
      ...this.getParamValue('per_page', 10, params.page)
    }
  }

  async getUBSs (req, res) {
    try {
      const paramsObject = this.getParamsObject(req.query)

      console.log('CHEGA AQUI ???????')
      const UBSs = await UBS.findUBSsAround(paramsObject)
      res.status(200).send(UBSs)
    } catch (error) {
      res.status(error.status).send({message: error.message})
    }
  }
}

module.exports = new UBSController()
