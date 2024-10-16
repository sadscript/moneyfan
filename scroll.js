// Scroll to bottom

let lastScrollHeight = 0;

const scrollToBottom = () => {
  // Scroll to the bottom of the page
  window.scrollTo(0, document.body.scrollHeight);

  // Check if new content has been loaded by comparing scroll heights
  if (document.body.scrollHeight !== lastScrollHeight) {
    lastScrollHeight = document.body.scrollHeight;

    // Scroll again after a delay to allow new content to load
    setTimeout(scrollToBottom, 1000);
  }
};