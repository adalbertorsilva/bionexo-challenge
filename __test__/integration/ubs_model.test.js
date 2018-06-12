const { UBS } = require('../../models')

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

describe('UBS MODEL', () => {
  describe('when passing an array and default pagination parameters', () => {
    it('should return an array with the 10 first letters', () => {
      const params = {
        page: 1,
        per_page: 10
      }

      const result = UBS.paginateResult(alphabet, params)
      expect(result).toHaveLength(10)
      expect(result[0]).toBe('A')
      expect(result[result.length - 1]).toBe('J')
    })
  })

  describe('when passing an array and page param equal to 2', () => {
    it('should return an array with the 11th to the 20th letters', () => {
      const params = {
        page: 2,
        per_page: 10
      }

      const result = UBS.paginateResult(alphabet, params)
      expect(result).toHaveLength(10)
      expect(result[0]).toBe('K')
      expect(result[result.length - 1]).toBe('T')
    })
  })

  describe('when passing an array and per_page param equal to 5', () => {
    it('should return an array with the 11th to the 20th letters', () => {
      const params = {
        page: 1,
        per_page: 5
      }

      const result = UBS.paginateResult(alphabet, params)
      expect(result).toHaveLength(5)
    })
  })

  describe('when passing a resultData to create an result object', () => {
    const resultData = [{ id: 481,
      name: 'UBS VILA ZATT',
      address: 'RUA MONSENHOR MANOEL GOMES',
      city: 'São Paulo',
      phone: '1139760514',
      point: { type: 'Point', coordinates: [-46.636, -23.548] },
      ubs_id: 481,
      size: 2,
      adaptation_for_seniors: 1,
      medical_equipament: 1,
      medicine: 3 },
    { id: 878,
      name: 'UBS ODUVALDO MAGLIO',
      address: 'RUA STA TEREZINHA',
      city: 'Osasco',
      phone: '1136543110',
      point: { type: 'Point', coordinates: [-46.7619109153734, -23.5487651824944] },
      ubs_id: 878,
      size: 1,
      adaptation_for_seniors: 1,
      medical_equipament: 1,
      medicine: 1 }]
    it('should return an object with structured params', () => {
      const params = {
        page: 1,
        per_page: 2
      }

      const result = UBS.responseObject(resultData, params)
      expect(result).toHaveProperty('current_page', 1)
      expect(result).toHaveProperty('current_page', 1)
      expect(result).toHaveProperty('total_entries', 2)
      expect(result).toHaveProperty('entries')
      expect(result.entries).toHaveLength(2)
      expect(result.entries[0]).toHaveProperty('id', 481)
      expect(result.entries[0]).toHaveProperty('name', 'UBS VILA ZATT')
      expect(result.entries[0]).toHaveProperty('address', 'RUA MONSENHOR MANOEL GOMES')
      expect(result.entries[0]).toHaveProperty('city', 'São Paulo')
      expect(result.entries[0]).toHaveProperty('phone', '1139760514')
      expect(result.entries[0]).toHaveProperty('geocode')
      expect(result.entries[0].geocode).toHaveProperty('lat', -23.548)
      expect(result.entries[0].geocode).toHaveProperty('long', -46.636)
      expect(result.entries[0]).toHaveProperty('scores')
      expect(result.entries[0].scores).toHaveProperty('size', 2)
      expect(result.entries[0].scores).toHaveProperty('adaptation_for_seniors', 1)
      expect(result.entries[0].scores).toHaveProperty('medical_equipament', 1)
      expect(result.entries[0].scores).toHaveProperty('medicine', 3)
    })
  })
})
