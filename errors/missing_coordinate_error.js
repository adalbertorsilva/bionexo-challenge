'use strict'
const autoBind = require('auto-bind')

class MissingCoordinateError extends Error {
  constructor () {
    super()
    autoBind(this)
    this.status = 422
    this.message = 'A coordinates is missing'
  }
}

module.exports = MissingCoordinateError
