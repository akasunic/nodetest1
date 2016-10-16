// JavaScript File
var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");
var photo = document.querySelector('#photo');
 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

window.onload = setInterval(testTimer, 3000);

if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}
 
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}

//I added this function
function testTimer(){
    console.log("hi");
    takepicture();
}
 
 //I took this function from a website: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
 function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  
  //I took this function from a website: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
  https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
function takepicture() {
    var context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);

  }


function videoError(e) {
    // do something
}