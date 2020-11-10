/*
Copyright 2017 Google Inc.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

getStream().then(getDevices).then(gotDevices);

function getDevices() {
  // AFAICT in Safari this only gets default devices until gUM is called :/
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
  window.deviceInfos = deviceInfos; // make available to console
  console.log('Available input and output devices:', deviceInfos);
  for (const deviceInfo of deviceInfos) {
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'audioinput') {
      option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
      audioSelect.appendChild(option);
    } else if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource = audioSelect.value;
  const videoSource = videoSelect.value;
  const constraints = {
    audio: {deviceId: audioSource ? {exact: audioSource} : undefined},
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  return navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  audioSelect.selectedIndex = [...audioSelect.options].
    findIndex(option => option.text === stream.getAudioTracks()[0].label);
  videoSelect.selectedIndex = [...videoSelect.options].
    findIndex(option => option.text === stream.getVideoTracks()[0].label);
  videoElement.srcObject = stream;
}

// Not showing vendor prefixes or code that works cross-browser.
// Snap shot
var video = document.querySelector('video');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var localMediaStream = null;

var snapshotDatas = new Array();

function snapshot() {
  if (localMediaStream) {
    const videoRec = video.getBoundingClientRect()

    canvas.width = videoRec.width;
    canvas.height = videoRec.height;

    ctx.drawImage(video, 0, 0);
    // ctx.drawImage(video, 0, 0, videoRec.width, videoRec.height);
    // "image/webp" works in Chrome.
    // Other browsers will fall back to image/png.
    // document.querySelector('img').src = ;
    snapshotDatas.unshift(canvas.toDataURL('image/webp'))
  }
}
function renderSnapshots(){
  try{
    const snapshots = document.getElementsByClassName('snapshots');

    snapshots[0].src = snapshotDatas[0];
    if(snapshotDatas.length > 1){
      snapshots[1].src = snapshotDatas[1];
    }
    else {
      throw 'OUTOFINDEX'
    }
  }
  catch(err){
    if(err.status == 'OUTOFINDEX'){
    }
  }
}

function drawGrid(ratio){
  const vrs = Array.from(document.getElementsByClassName("vr"));
  const hrs = Array.from(document.getElementsByClassName("hr"));

  const videoRec = video.getBoundingClientRect()
  const leftPx = Math.round(videoRec.width/ratio);
  const bottomPx = Math.round(videoRec.height/ratio);

  const GRIDNUM = ratio - 1;

  var iter = 1
  vrs.map((item, key) => {
    if(keyHitCount == 1 && key + 1 > GRIDNUM){
    }
    else{
      const left = iter * leftPx;
      const style = `
      margin-left:${left.toString()}px;
      height:${videoRec.height.toString()}px;
      `
  
      item.setAttribute('style', style);
      iter += 1;
      if((key + 1) % GRIDNUM == 0)
        iter = 1}
    
  })

  iter = 1
  hrs.map((item, key) => {
    if(keyHitCount == 1 && key + 1 > GRIDNUM){
    }
    else{
      const bottom = iter * bottomPx;
      const style = `
      bottom:${bottom.toString()}px;
      width:${videoRec.width.toString()}px;
      `

      item.setAttribute('style', style);
      iter += 1;
      if((key + 1) % GRIDNUM == 0)
        iter = 1
    }
  })
}

function errorCallback(){
  console.log("Fail getUserMedia");
}

navigator.getUserMedia({video: true}, function(stream) {
  video.srcObject=stream;
  localMediaStream = stream;
}, errorCallback);

function handleError(error) {
  console.error('Error: ', error);
}