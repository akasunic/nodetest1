// FRONT END

var video = document.querySelector("#videoElement");
var canvas = document.querySelector("#canvas");
var photo = document.querySelector('#photo');
var numPhotos=0;


 
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;

if (navigator.getUserMedia) {       
    navigator.getUserMedia({video: true}, handleVideo, videoError);
}
 
 //get video
function handleVideo(stream) {
    video.src = window.URL.createObjectURL(stream);
}

$('#enterTrait').on('click', function(){
  $('#traitText').text("Show yourself as " + $('#inputTrait').val());
  
})

var gallery = $("#gallery");
//switch which photo is selected (shows red border) in the gallery, and make the current photo match the selected thumbnail
gallery.on("click", "img", function(){
  gallery.children($('img')).removeClass('selected');
  $this = $(this);
  $this.addClass('selected');
  $('#photo').attr('src', $this.attr('src'));
});

//click to show/hide sections (see jade template)
$(".section").on('click', 'button', function(){
    thisSection = $(this).closest('div .section');
    thisSection.addClass('hide');
    thisSection.next('div .hide').removeClass('hide');
});

 //takes photo from webcam, updates current photo and the gallery (including selection)
 $('#btnPhoto').on("click", function(){
    var context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
      var currentImg = $('<img>').attr("src", data);
      gallery.children($('img')).removeClass('selected');
      gallery.append(currentImg.addClass('selected'));
      numPhotos+=1;
      $('#numPhotos').val(numPhotos);
      console.log('value' + $( '#numPhotos').val());
      
 })

// consulted the following site for this function: https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Taking_still_photos
// this function used to capture image in current canvas, and then save to URL
 function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

//have not yet created videoError function
function videoError(e) {
    // do something
}
