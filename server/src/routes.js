/**
 * Created by ale on 08/12/2017.
 */
const StatusController = require('./controllers/StatusController')
const PlayerController = require('./controllers/PlayerController')
const QuestionController = require('./controllers/QuestionController')
const TopicController = require('./controllers/TopicController')
const CategoryController = require('./controllers/CategoryController')
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

  // get a player
  app.get('/api/player/:id', PlayerController.getPlayer)

  // create new player
  app.post('/api/players/create',
    PlayerControllerPolicy.register,
    PlayerController.register)

  // update a single player
  // create new player
  app.post('/api/player/update',
    PlayerController.update)

  // TOPICS API
  app.get('/api/topics', TopicController.getTopics)

  // CATEGORIES API
  app.get('/api/categories', CategoryController.getCategories)

  app.get('/api/status', StatusController.status)
}
