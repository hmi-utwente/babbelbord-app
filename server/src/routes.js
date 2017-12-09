/**
 * Created by ale on 08/12/2017.
 */
const StatusController = require('./controllers/StatusController')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('<h1>Ciao</h1>')
  })

  app.get('/players', (req, res) => {
    res.send({
      message: 'List all the playersss'
    })
  })

  app.get('/status', StatusController.status)
}
