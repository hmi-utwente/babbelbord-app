const {Category} = require('../models')
var Server = require('../app')

module.exports = {

  async getCategories(req,res) {
    try {
      const categories = await Category.findAll()
      res.send(categories)
    } catch(err) {
      res.status(400).send({
        error: 'Couldn\'t get the categories!'
      })
    }
  },
  getCategoryArduino(req, res) {
    // get data from req.params.category
    const category = req.params.category

    // send data with socketIO
    Server.io.emit('category', category);

    res.send(category)
  }
}
