/**
 * Created by ale on 08/12/2017.
 */
const StatusController = require('./controllers/StatusController')
const PlayerController = require('./controllers/PlayerController')
const QuestionController = require('./controllers/QuestionController')
const PlayerControllerPolicy = require('./policies/PlayerControllerPolicy')

module.exports = (app) => {
  app.get('/api/', (req, res) => {
    res.send('<h1>Ciao</h1>')
  })

  // QUESTIONS API
  // get all the questions
  app.get('/api/questions', QuestionController.getAllQuestions)

  // PLAYERS API
  // get all the players
  app.get('/api/players', PlayerController.getAllPlayers)

  // create new player
  app.post('/api/players/create',
    PlayerControllerPolicy.register,
    PlayerController.register)

  app.get('/api/status', StatusController.status)
}
