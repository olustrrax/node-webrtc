const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.get(express.static('public'))
app.set('port', 7000)
app.get('/', (req, res) => {
	res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
	res.render('room', { roomId: req.params.room })
})

io.on('connection', (client) => {
	console.log('Client connected..')
	client.on('join-room', (roomId, userId) => {
		console.log(roomId, userId)
	})
	client.on('disconnect', () => { /* … */ });
})

server.listen(app.get('port'), () => {
	console.log(`🚀 Server ready on ${app.get('port')}~~~~`)
})

// io.sockets.on('connection', function (client) {
//     console.log('new connection ' + client.id)

//     client.on('offer', function (derails) {
//         client.broadcast.emit('offer', details)
//         console.log('offer: ' + JSON.stringify(details))
//     })
//     client.on('answer', function (derails) {
//         client.broadcast.emit('answer', details)
//         console.log('answer: ' + JSON.stringify(details))
//     })
//     client.on('candidate', function (derails) {
//         client.broadcast.emit('candidate', details)
//         console.log('candidate: ' + JSON.stringify(details))
//     })

//     client.broadcast.emit('createoffe', {})
// })
