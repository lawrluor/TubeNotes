// Inject content script into page
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Inject CKEditor text editor script into page
// var CKEDITOR_BASEPATH = '/ckeditor/';
// var editor_script = document.createElement('script');
// editor_script.src = "//cdn.ckeditor.com/4.5.10/standard/ckeditor.js";
// // editor_script.src = "ckeditor/ckeditor.js"
// editor_script.type = "text/javascript"
// document.head.appendChild(editor_script)
// firstScriptTag.parentNode.insertBefore(editor_script, firstScriptTag);


// This code doesn't run
document.addEventListener('DOMContentLoaded', function() {
  console.log("test")
  inject_text_editor()
  document.getElementById('text_editor').onkeydown = getTime;
}, false);

// Grab from Youtube page
var player = document.getElementsByTagName("video")[0];
console.log(player);

/*
function onYouTubeIframeAPIReady() {
  player = new YT.Player('iframe_json', {
    //taken from tag <meta itemprop="videoId" content="7LIwinh1AIQ">
    videoId: '7LIwinh1AIQ',
    events: {
      'onReady': onReady,
      'onStateChange': onStateChange,
      'onKeyDown': onKeyDown
    }
  });
};
*/

// Create text editor in comment section by replacing videos with text area
// delete playlist as well. Create functions for this
function inject_text_editor() {
  var note_button = document.createElement('input');
  note_button.type = "button"
  note_button.id = "note_button"
  note_button.value = "Take Note"
  note_button.onclick = onNoteCommit;

  var text_editor = document.createElement('textarea');
  text_editor.id = "text_editor"
  text_editor.onkeydown = getTime
  // text_editor.style.float = "right"
  // replace with CKEditor text area
  // CKEDITOR.replace( 'text_editor' );

  var note_list = document.createElement('ul');
  document.body.appendChild(note_list)
  console.log("list created")

  var playlist = document.getElementById("player-playlist")
  if (playlist) {
    playlist.parentNode.removeChild(playlist);
  }

  var first_video = document.getElementsByClassName("video-list")[0]
  if (first_video) {
    first_video.parentNode.removeChild(first_video);
  }

  var autoplay_bar = document.getElementsByClassName("autoplay-bar")[0]
  if (autoplay_bar) {
    autoplay_bar.parentNode.replaceChild(note_button, autoplay_bar);
  }

  var related_videos = document.getElementById("watch-related")
  if (related_videos) {
    related_videos.parentNode.replaceChild(text_editor, related_videos);
  }

  var title = document.getElementsByClassName("watch-title")[0]
  if (title) {
    title.parentNode.replaceChild(note_button, title)
  }
}

inject_text_editor()

// Authentication
//chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  // Use the token.
//});

//Message passing
var port = chrome.runtime.connect("anpakfbcmomgdjhaplabecdfeikclgll", {name: "note"});

chrome.runtime.onMessage.addListener(function() {
  chrome.runtime.sendMessage({method:'getTimeReq'}, function(response) {
    console.log("Time request accepted");

    // function to get timestamp and send to background script
    chrome.runtime.sendMessage({method:'postTimestamp', timestamp:onNoteTake()}, function(response) {
      console.log('postTimeStamp', onNoteTake());
    });
  });
});

// ---MAIN APPLICATION---

var is_typing = false;
var global_note = "";
console.log(is_typing);

function getTime() {
  if (is_typing === true) {
    console.log(is_typing);
    return;
  } else {
    is_typing = true;
    console.log(is_typing);

    // global_note = onNoteTake()
    global_note = onNoteType()
  }
}

// The API will call this function when the video player is ready.
function onReady(event) {
  console.log('Video Duration:', player.getDuration());
}

// Updates current time for onStateChange event
function onStateChange(e) {
  console.log('State is:', e.data);
}

function onNoteType() {
  if (player) {
    var current_time = player.currentTime;
    timestamp = createTimeStamp(current_time);

    url = formatURL(current_time, document.URL);
    console.log(timestamp + " " + url);
    return (timestamp + " " + url);
  } else {
    console.log("player not found");
  }
}

function onNoteCommit() {
  console.log("committing note")
  note_text = document.getElementById('text_editor').value
  global_note = global_note +  " - " + note_text

  var entry = document.createElement('li');
  entry.appendChild(document.createTextNode(global_note));
  // note_list.appendChild(entry);
  console.log(entry)

  document.getElementById('text_editor').value = "";
  is_typing = false;
  console.log(is_typing)
}

function onNoteTake() {
  if (player) {
    var current_time = player.getCurrentTime()
    console.log(current_time)
    timestamp = createTimeStamp(current_time)

    url = formatURL(current_time, document.URL)
    return (timestamp + " " + url)
  } else {
    console.log("player not found");
  }
}

// Helper function for onNoteTake, to create URL with integer timestamp
function formatURL(current_time, url) {
  formatted_url = String(url)
  time_in_seconds = String(Math.floor(current_time))
  timestamped_url = formatted_url + "&t=" + time_in_seconds + "s"
  return timestamped_url
}

// Helper function for formatURL, to create integer timestamp
function createTimeStamp(time){
    time = Math.floor(time);

    var minutes = Math.floor(time / 60),
    seconds = time - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return "[" + String(minutes) + ":" + String(seconds) + "]";
}