// Inject query.js and scroll.js
let queryScript = document.createElement('script');
queryScript.src = chrome.runtime.getURL('query.js');
(document.head || document.documentElement).appendChild(queryScript);

let scrollScript = document.createElement('script');
scrollScript.src = chrome.runtime.getURL('scroll.js');
(document.head || document.documentElement).appendChild(scrollScript);

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "search") {
    let searchString = request.query ? `"${request.query}"` : "''";
    let script = document.createElement('script');
    script.textContent = `searchTableRows(${searchString});`;
    (document.head || document.documentElement).appendChild(script);
  } else if (request.action === "scrollToBottom") {
    let script = document.createElement('script');
    script.textContent = 'scrollToBottom();';
    (document.head || document.documentElement).appendChild(script);
  }
});

// Listen for messages from the page script
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    chrome.runtime.sendMessage({action: "updateTotal", total: event.data.totalValue});
  }
}, false);
