document.getElementById('billingPage').addEventListener('click', () => {
  chrome.tabs.update({url: 'https://onlyfans.com/my/payments/list?type=all'});
});

document.getElementById('scrollBottom').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "scrollToBottom"});
  });
});

document.getElementById('runSearch').addEventListener('click', () => {
  let searchQuery = document.getElementById('searchInput').value;
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {action: "search", query: searchQuery});
  });
});

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateTotal") {
    document.getElementById('totalAmount').textContent = `$${request.total}`;
  }
});
