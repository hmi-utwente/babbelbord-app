/**
 * Created by ale on 08/12/2017.
 */
const StatusController = require('./controllers/StatusController')
const PlayerController = require('./controllers/PlayerController')
const PlayerControllerPolicy = require('./policies/PlayerControllerPolicy')

module.exports = (app) => {
  app.get('/api/', (req, res) => {
    res.send('<h1>Ciao</h1>')
  })

  app.post('/api/players/create',
    PlayerControllerPolicy.register,
    PlayerController.register)

  app.get('/api/players', PlayerController.getAllPlayers)
  app.get('/api/status', StatusController.status)
}
