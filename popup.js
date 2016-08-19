//chrome.runtime.sendMessage({method:'getTitle'}, function(response){
//  console.log("Response:", response)
//  appendNote("responses", response)
//});

// Global variable to check if currently typing a note
is_typing = false;
console.log(is_typing);

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('note_text').onkeydown = postTimeReq;
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('note_button').onclick = onNoteTake;
});

function onNoteTake(event) {
  note_text = document.getElementById('note_text').value;
  var timestamp;

  // Call to helper function getTimestamp is asynchronous
  chrome.runtime.sendMessage({method:'getTimestamp'}, function(response) {
    timestamp = response.timestamp;
    console.log("got Timestamp, response:", response.timestamp);

    timestamped_note = timestamp + " - " + note_text;
    appendNote(timestamped_note);
    document.getElementById('note_text').value = "";
    is_typing = false;
    console.log(is_typing);
  });
};

// "API" for message passing between Extension and content script
function postTimeReq() {
  if (is_typing === true) {
    console.log(is_typing);
    return;
  } else {
    is_typing = true;
    console.log(is_typing);

    chrome.runtime.sendMessage({method:'postTimeReq'}, function(response) {
      console.log("postTimeReq", response);
    });
  }
};

function getTimestamp() {
  chrome.runtime.sendMessage({method:'getTimestamp'}, function(response) {
    timestamp = response.timestamp
    console.log("got Timestamp, response:", timestamp);
    return timestamp
  });
}

function appendNote(note_text) {
  list = document.getElementById("notes")

  var entry = document.createElement('li');
  entry.appendChild(document.createTextNode(note_text))
  list.appendChild(entry)
  document.getElementById('note_text').value = ""
}