/**
 * Created by ale on 08/12/2017.
 */

const {Player} = require('../models')

// TODO: set unique key, so the user cannot be created twice.
// TODO: However, it has to be either name or lastname and potentially not the Id :(

module.exports = {
  async getAllQuestions(req,res) {
    try {
      const questions = await Question.findAll()
      res.send(questions)
    } catch(err) {
      res.status(400).send({
        error: 'Couldn\'t get the questions!'
      })
    }
  }
}