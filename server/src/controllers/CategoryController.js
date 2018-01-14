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
  postCategoryArduino(req, res) {
    // get data from req.params.category
    let data = req.body

    // Capitalize first letter to match sintax on DB
    //category = category.charAt(0).toUpperCase() + category.slice(1)

    // send data with socketIO
    Server.io.emit('category', data);
    res.send(data)
  }
}
