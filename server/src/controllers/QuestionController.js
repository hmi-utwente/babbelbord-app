/**
 * Created by ale on 08/12/2017.
 */

const {Question} = require('../models')

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

    // TODO send the category to the tablet through socketIO
  }
}

