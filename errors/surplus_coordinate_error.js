'use strict'
const autoBind = require('auto-bind')

class SurplusCoordinateError extends Error {
  constructor () {
    super()
    autoBind(this)
    this.status = 422
    this.message = 'Surplus coordinate'
  }
}

module.exports = SurplusCoordinateError
