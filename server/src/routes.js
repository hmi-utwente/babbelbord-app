/**
 * Created by ale on 07/12/2017.
 */

module.exports = (app) => {
  app.get('/status', (req, res) => {
    res.send({
      message: 'Hello world'
    })
  })
}
