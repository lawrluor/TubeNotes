var player;
// Callback for when the YouTube iFrame player is ready
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	// Setup event handelers
	events: {
	'onReady': onPlayerReady,
	'onStateChange': onPlayerStateChange,
	'onPlaybackQualityChange': onPlaybackQualityChange,
	'onPlaybackRateChange': onPlaybackRateChange,
	'onError': onError,
	'onApiChange': onApiChange
    }
  });
};

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
