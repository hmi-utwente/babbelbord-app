/**
 * Created by ale on 08/12/2017.
 */

const {Topic} = require('../models')

module.exports = {

  async getTopics(req,res) {
    try {
      const topics = await Topic.findAll()
      res.send(topics)
    } catch(err) {
      res.status(400).send({
        error: 'Couldn\'t get the topics!'
      })
    }
  }
}