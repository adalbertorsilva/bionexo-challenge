'use strict'
const autoBind = require('auto-bind')

class InvalidCoordinateError extends Error {
  constructor () {
    super()
    autoBind(this)
    this.status = 422
    this.message = 'Coordinate must be a number'
  }
}

module.exports = InvalidCoordinateError
