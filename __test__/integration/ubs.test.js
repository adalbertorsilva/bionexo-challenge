const request = require('supertest')
const app = require('../../server/app')

describe('Basic Health Unit', () => {
  describe('GET', () => {
    describe('when getting with an incomplete coordinate param', () => {
      it('must return a 403 status and an error message', async () => {
        const response = await request(app).get('/find_ubs?query=-23.604936&page=1&per_page=1')
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'A coordinates is missing')
      })
    })

    describe('when getting with more than two coordinate params', () => {
      it('must return a 422 status and an error message', async () => {
        const response = await request(app).get('/find_ubs?query=-23.604936,-46.692999,99.999999&page=1&per_page=1')
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'Surplus coordinate')
      })
    })

    describe('when getting with non number coordinate param', () => {
      it('must return a 422 status and an error message', async () => {
        const response = await request(app).get('/find_ubs?query=-23.604936,trickycoordinate&page=1&per_page=1')
        expect(response.status).toBe(422)
        expect(response.body).toHaveProperty('message', 'Coordinate must be a number')
      })
    })
  })
})
