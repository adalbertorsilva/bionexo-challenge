const { ubs: ubsController } = require('../../controllers')
const { missing_coordinate_error: MissingCoordinateError,
  surplus_coordinate_error: SurplusCoordinateError,
  invalid_coordinate_error: InvalidCoordinateError,
  invalid_param_error: InvalidParamError } = require('../../errors')

describe('UBS Controller --> getCoordinates', () => {
  describe('when passing a single coordinate', () => {
    it('must throw an missing coordinate error', () => {
      expect(() => { ubsController.getCoordinates('-23.604936') }).toThrow(MissingCoordinateError)
    })
  })

  describe('when passing more than two coordinates', () => {
    it('must throw an surplus coordinate error', () => {
      expect(() => { ubsController.getCoordinates('-23.604936,-46.692999,99.999999') }).toThrow(SurplusCoordinateError)
    })
  })

  describe('when the passed coordinate is not a number', () => {
    it('must throw an invalid coordinate error', () => {
      expect(() => { ubsController.getCoordinates('-23.604936,sometrickycoordinate') }).toThrow(InvalidCoordinateError)
    })
  })

  describe('when the passed coordinate has two number values', () => {
    it('must return an object with two attributes ( lat and long )', () => {
      expect(ubsController.getCoordinates('-23.604936,-46.692999')).toHaveProperty('lat', '-23.604936')
      expect(ubsController.getCoordinates('-23.604936,-46.692999')).toHaveProperty('long', '-46.692999')
    })
  })
})

describe('UBS Controller --> getParamValue', () => {
  describe('when the passed param is not a number', () => {
    it('must throw an invalid param error', () => {
      expect(() => { ubsController.getParamValue('page', 10, 'sometrickyparam') }).toThrow(InvalidParamError)
    })
  })

  describe('when the param name is empty', () => {
    it('must throw an invalid param error', () => {
      expect(() => { ubsController.getParamValue('', 10, '5') }).toThrow(InvalidParamError)
    })
  })

  describe('when the param name is null', () => {
    it('must throw an invalid param error', () => {
      expect(() => { ubsController.getParamValue(null, 10, '5') }).toThrow(InvalidParamError)
    })
  })

  describe('when the correct values are passed and the desired value is not empty', () => {
    it('must return an object with an attribute with the same name of the first parameter', () => {
      expect(ubsController.getParamValue('page', 10, '5')).toHaveProperty('page', 5)
    })
  })

  describe('when the correct values are passed and the desired value is empty', () => {
    it('must return an object with an attribute with the same name of the first parameter', () => {
      expect(ubsController.getParamValue('page', 10, '')).toHaveProperty('page', 10)
    })
  })

  describe('when the correct values are passed and the desired value is null', () => {
    it('must return an object with an attribute with the same name of the first parameter', () => {
      expect(ubsController.getParamValue('page', 10)).toHaveProperty('page', 10)
    })
  })
})
