// gets title and sends to background script
//chrome.runtime.sendMessage(document.getElementsByTagName('title')[0].innerText);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
  });
}

// gapi.client.setApiKey("AIzaSyDDsMJ3RNTGb_bqAEbya3WkgtPOLQ6wlRE");

console.log(player);
if (player.PLAYING) {
	console.log("playing")
} else {
	console.log("not playing")
}

document.addEventListener("keydown", function(e) {
	switch(e.which) {
		case 219:
			console.log(player.getCurrentTime())
	}
}
);
chrome.runtime.sendMessage(player);