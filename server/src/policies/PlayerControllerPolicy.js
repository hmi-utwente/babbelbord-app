/**
 * Created by ale on 09/12/2017.
 */

const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      name: Joi.string().regex(/^[a-zA-Z]+$/),
      lastname: Joi.string()
    }

    const {error, value} = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key)
      {
        case 'name':
          res.status(400).send({
            error: 'De naam mag alleen letters bevatten '
          })
          break
        case 'lastname':
          res.status(400).send({
            error: 'De achternaam mag alleen letters bevatten '
          })
          break
        default:
          res.status(400).send({
            error: "Invalid information given, try again"
          })
      }
    } else {
      next()
    }
  }
}