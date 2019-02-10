import React, { Component} from 'react'
import Peer from 'simple-peer'
import { ActionCable } from 'react-actioncable-provider'
const token = localStorage.getItem("jwt")

require('events').EventEmitter.prototype._maxListeners = 100

let p1;
let p2;
let info;


class Webcam extends Component {
  state = {
    info: {}
  }
// componentDidMount(){
//   this.initPeer()
// }
    initPeer = () => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(stream => this.gotMedia(stream))
      // .then(stream => {
      }

    gotMedia = (stream) => {
      p1 = new Peer({ initiator: window.location.hash === '#init', stream: stream, trickle: false})
      p2 = new Peer({stream: stream})
      console.log('p2', p2)
      console.log(p1)
      p1.on('signal', data => this.sendSDP(data))

      // p1.on('stream', function(stream){
      //   const videoWrapper = document.querySelector('#video-wrapper')
      //   const video = document.createElement('video')
      //   videoWrapper.append(video)
      //   video.srcObject = stream
      //   video.play()
  }


  sendSDP = (sdp) => {

    fetch('http://localhost:3000/video',{method:'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: 'Token ' + token
    },
    body: JSON.stringify(sdp)
  }).then(r => console.log(r))
  }

  onReceived = (e) => {
    this.setState({info: e})
}
  getSDP = () => {
    debugger
    if(!p1.initiator){
      p1.setLocalDescription(this.state.info)
    }
  }
    render(){
      console.log(this.state)
    return(
      <div>
         <ActionCable ref='videoChannel' channel={{channel: 'VideosChannel'}} onReceived={this.onReceived} />
         <div id="video-wrapper">
           <button onClick={() => this.initPeer()}>CONNECT WEBCAM</button>
           <button onClick={() => this.getSDP()}>SDP ME</button>
           <video id="video"></video>
           <video id="received-video"></video>
           <button onClick={this.reconnect}>Reconnect</button>
         </div>
       </div>
      )
    }
  }

export default Webcam;

// peer2.on('signal', function (data) {
//   console.log('peer2 signal', data)
//   peer1.signal(data)
// })

// peer2.on('stream', function (stream) {
//   // got remote video stream, now let's show it in a video tag
//   console.log('stream', stream)
//   var video = document.querySelector('video')
//   video.src = window.URL.createObjectURL(stream)
//   video.play()

//
//     console.log("STREAM OBJ", stream)
//     console.log("INITPEER", p1._id)
//
//     const videoWrapper = document.querySelector('#video-wrapper')
//     const video = document.createElement('video')
//     videoWrapper.append(video)
//     video.className = p1._id
//     video.srcObject = stream
//     video.play()
//
//   })
//   .then(() => {
//     p1.on('signal', (data) => {
//       this.sendSDP(data)
//     })
//   })
// }

// navigator.mediaDevices.getUserMedia({ video: true, audio: false })
// .then(stream => {
//   p1 = new Peer({ initiator: true, stream: stream, trickle: false })
//   console.log("STREAM OBJ", stream)
//   console.log("INITPEER", p1) // has info
//
//   const video = document.querySelector('#video')
//   video.srcObject = stream
//   video.play()
// })
// .then(() => {
//   p1.on('signal', (data) => {
//     p1._pc.setLocalDescription = data
//     this.sendSDP(data)
//     // this.sendSignal('send_signal', {init_signal: data})
//   })
// })
