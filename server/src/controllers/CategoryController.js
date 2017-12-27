const {Category} = require('../models')

module.exports = {

  async getCategories(req,res) {
    try {
      const categories = await Topic.findAll()
      res.send(categories)
    } catch(err) {
      res.status(400).send({
        error: 'Couldn\'t get the categories!'
      })
    }
  }
}