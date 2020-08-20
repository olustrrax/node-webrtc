const socket = io()
const myPeer = new Peer(undefined, {
  host: '/',
  port: '3001'
})
const videoGrid = document.getElementById('video-grid')
const myVideo = document.createElement('video')
myVideo.muted = true
const peers= {}
const getUserMedia = navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia || navigator.mediaDevices.mozGetUserMedia;
getUserMedia({
  video: true,
  audio: true
}).then((stream) => {
  addVideoStream(myVideo, stream)
  myPeer.on('call', call => { //If someone want to call
    call.answer(stream)// Answer the call with an A/V stream.
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })
  socket.on('user-connected', userId => {
    //When new user are connect then 
    connectToNewUser(userId, stream)
  })
  
})

socket.on('user-disconnected', userId => {
  console.log('disconnect',userId)
  if(peers[userId])
    peers[userId].close()
})

// on open will be launch when you successfully connect to PeerServer
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})


function connectToNewUser(userId, stream) {
  // Media calls
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    // Show stream in some video/canvas element.
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })
  peers[userId] = call
}
function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}