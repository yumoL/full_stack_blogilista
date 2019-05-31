const config = require('./utils/config')
const app = require('./app')
const http = require('http')

const server = http.createServer(app)

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)
})