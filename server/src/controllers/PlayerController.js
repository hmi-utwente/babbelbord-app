/**
 * Created by ale on 08/12/2017.
 */

const {Player} = require('../models')

// TODO: set unique key, so the user cannot be created twice.
// TODO: However, it has to be either name or lastname and potentially not the Id :(

module.exports = {
  async register(req, res) {
    try {
      const player = await Player.create(req.body)
      res.send(player.toJSON())
    } catch(err) {
      res.status(400).send({
        error: 'Name already in use!'
      })
      // user already existing?
    }
  }
}