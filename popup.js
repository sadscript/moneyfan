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
    
    const top5Container = document.getElementById('top5Models');
    if (request.top5Models) {
      top5Container.innerHTML = '<p>Top 5 Results:</p><ul>' + 
        request.top5Models.map(model => `<li><a href="${model.url}" target="_blank">${model.name}</a>: $${model.amount}</li>`).join('') +
        '</ul>';
      top5Container.style.display = 'block';
      document.body.style.height = 'auto';  // Allow popup to expand
    } else {
      top5Container.style.display = 'none';
      document.body.style.height = '';  // Reset to default
    }
  }
});
