window.onload = function() {
	document.getElementById('save').onclick = function() {
		var value = document.getElementById('saveLine').value;
		console.log(value)
		// alert(value);

		chrome.storage.sync.set({'myLine': value}, function() {
			alert('success!')
		});
	};

	document.getElementById('get').onclick = function() {
		chrome.storage.sync.get('myLine', function(data) {
			console.log(data.myLine)
			alert(data.myLine)
		});
	};
}