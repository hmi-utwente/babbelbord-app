/**
 * Created by ale on 08/12/2017.
 */
const StatusController = require('./controllers/StatusController')
const PlayerController = require('./controllers/PlayerController')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('<h1>Ciao</h1>')
  })

  app.post('/players', PlayerController.register)
  app.get('/status', StatusController.status)
}
