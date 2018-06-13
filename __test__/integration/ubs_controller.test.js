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

    describe('when getting with all params set', () => {
      it('must return a 200 status and and a list of objects', async () => {
        const response = await request(app).get('/find_ubs?query=-23.604936,-46.692999&page=1&per_page=1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('current_page', 1)
        expect(response.body).toHaveProperty('total_entries', 122)
        expect(response.body).toHaveProperty('entries')
        expect(response.body.entries).toHaveLength(1)
        expect(response.body.entries[0]).toHaveProperty('id')
        expect(response.body.entries[0]).toHaveProperty('name')
        expect(response.body.entries[0]).toHaveProperty('address')
        expect(response.body.entries[0]).toHaveProperty('city')
        expect(response.body.entries[0]).toHaveProperty('phone')
        expect(response.body.entries[0]).toHaveProperty('geocode')
        expect(response.body.entries[0].geocode).toHaveProperty('lat')
        expect(response.body.entries[0].geocode).toHaveProperty('long')
        expect(response.body.entries[0]).toHaveProperty('scores')
        expect(response.body.entries[0].scores).toHaveProperty('size')
        expect(response.body.entries[0].scores).toHaveProperty('adaptation_for_seniors')
        expect(response.body.entries[0].scores).toHaveProperty('medical_equipament')
        expect(response.body.entries[0].scores).toHaveProperty('medicine')
      })
    })

    describe('when getting with only coordinates set', () => {
      it('must return a 200 status and and a list of objects', async () => {
        const response = await request(app).get('/find_ubs?query=-23.604936,-46.692999')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('current_page', 1)
        expect(response.body).toHaveProperty('total_entries', 122)
        expect(response.body).toHaveProperty('entries')
        expect(response.body.entries).toHaveLength(10)
        expect(response.body.entries[0]).toHaveProperty('id')
        expect(response.body.entries[0]).toHaveProperty('name')
        expect(response.body.entries[0]).toHaveProperty('address')
        expect(response.body.entries[0]).toHaveProperty('city')
        expect(response.body.entries[0]).toHaveProperty('phone')
        expect(response.body.entries[0]).toHaveProperty('geocode')
        expect(response.body.entries[0].geocode).toHaveProperty('lat')
        expect(response.body.entries[0].geocode).toHaveProperty('long')
        expect(response.body.entries[0]).toHaveProperty('scores')
        expect(response.body.entries[0].scores).toHaveProperty('adaptation_for_seniors')
        expect(response.body.entries[0].scores).toHaveProperty('medical_equipament')
        expect(response.body.entries[0].scores).toHaveProperty('medicine')
      })
    })
  })
})
