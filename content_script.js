/*
Injects existing_iframe.js into YouTube page.

Content scripts are executed in an isolated environment, so to manipulate the player
need to execute script into the page.

Credits to frame-by-frame for this code
*/

var s = document.createElement('script');
s.src = chrome.extension.getURL("existing_iframe.js");
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head||document.documentElement).appendChild(s);
