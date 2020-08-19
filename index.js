var socketIO = require('socket.io')
var server  = require('http').createServer().listen(7000, '0.0.0.0')
var io = socketIO.listen(server)

io.sockets.on('connection', function (client) {
    console.log('new connection ' + client.id)

    client.on('offer', function (derails) {
        client.broadcast.emit('offer', details)
        console.log('offer: ' + JSON.stringify(details))
    })
    client.on('answer', function (derails) {
        client.broadcast.emit('answer', details)
        console.log('answer: ' + JSON.stringify(details))
    })
    client.on('candidate', function (derails) {
        client.broadcast.emit('candidate', details)
        console.log('candidate: ' + JSON.stringify(details))
    })

    client.broadcast.emit('createoffe', {})
})