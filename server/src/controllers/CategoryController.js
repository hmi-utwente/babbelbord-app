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
    let category = req.params.category

    // Capitalize first letter to match sintax on DB
    category = category.charAt(0).toUpperCase() + category.slice(1)

    // send data with socketIO
    Server.io.emit('category', category);
    res.send(category)
  }
}
