const {ubs: UBSController} = require('../controllers')

module.exports = (app) => {
  app.get('/find_ubs', UBSController.getUBSs)
}
