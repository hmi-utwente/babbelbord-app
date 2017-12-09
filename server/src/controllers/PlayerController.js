/**
 * Created by ale on 08/12/2017.
 */

const {Player} = require('../models')

module.exports = {
  async register(req, res) {
    try {
      const player = await Player.create(req.body)
    } catch(err) {
      res.status(400).send({
        error: 'Name already in use!'
      })
      // user already existing?
    }
  }
}