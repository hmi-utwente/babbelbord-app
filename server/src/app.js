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

// socketIO integration
var http = require('http').Server(app)
var io = require('socket.io')(http)

io.on('connection', function (socket) {
  console.log('Client has connected to the server with SocketIO')
})

require('./routes')(app)

sequelize.sync()
  .then(() => {
    app.listen(config.port)
    console.log('Server started on port ' + config.port)
  })
