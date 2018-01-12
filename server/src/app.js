const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const serveStatic = require('serve-static')
const path = require('path')

const {sequelize} = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(serveStatic(path.join(__dirname, '..', 'dist')))

require('./routes')(app)

sequelize.sync()
  .then(() => {
    var server = app.listen(config.port)

    // socketIO integration
    var io = require('socket.io').listen(server)

    exports.server = server
    exports.io = io

    io.on('connection', function (socket) {
      console.log('Client has connected to the server with SocketIO')

      exports.socket = socket
    })
    console.log('Server started on port ' + config.port)
  })
