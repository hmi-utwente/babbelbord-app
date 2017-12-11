/**
 * Created by ale on 08/12/2017.
 */
const StatusController = require('./controllers/StatusController')
const PlayerController = require('./controllers/PlayerController')
const PlayerControllerPolicy = require('./policies/PlayerControllerPolicy')

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('<h1>Ciao</h1>')
  })

  app.post('/players/create',
    PlayerControllerPolicy.register,
    PlayerController.register)
  // app.get('/players', PlayerControllerPolicy.register, PlayerController.register)
  app.get('/status', StatusController.status)
}
