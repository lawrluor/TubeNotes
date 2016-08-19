// [DONE] 0. Create an EventListener in popup.js to trigger on Keydown
// [DONE] 1. Type Message in extension (popup.html), and inject it back into popup.html through popup.js event listener
// [DONE] 2. Send GET message to background script, which will send a POST message to page to get timestamp
// [DONE] 3. Return the timestamp by sending POST message from page to background script
// [DONE] 4. Log the timestamp by sending GET message from popup.js to background script

var timestamp;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
	//if (message.method == 'setTitle') {
	//	console.log("Message 'setTitle' received in background script from content_script, sending to popup.js");
	//	title = message.title;
	//} 
	//else if (message.method == 'getTitle') {
	//	console.log("Message 'getTitle' received in background script from popup.js, sending to content_script")
	//	sendResponse(title);
	//}
	if (message.method === 'postTimeReq') {
		console.log("[1] Message 'postTimeReq' received in background script from popup.js, sending to content_script")
	}
	else if (message.method === 'getTimeReq') {
		console.log("[2] Message 'getTimeReq' received in background script from content_script, sending to popup.js")
		sendResponse();
	}
	else if (message.method === 'postTimestamp') {
		console.log("[3] Message 'postTimestamp' received in background script from content_script, sending to popup.js")
		timestamp = message.timestamp;
	}
	else if (message.method === 'getTimestamp') {
		console.log("[4] Message 'getTimestamp' received in background script from popup.js, sending to popup.js")
		sendResponse({'timestamp': timestamp})	
	}
});


