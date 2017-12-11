const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const serveStatic = require('serve-static')

const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.use(serveStatic(path.join(__dirname, 'dist')))

require('./routes')(app)

sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log('Server started on port ' + config.port)
  })
