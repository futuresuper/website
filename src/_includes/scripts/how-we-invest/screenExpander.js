const screensContainer = document.querySelector(".screens-container");
const expanderButton = document.querySelector("button.expander");
const screens = document.querySelector(".screens");

expanderButton.onclick = function () {
  // Open screens container
  // Set to same height as its child contents
  screensContainer.style.maxHeight = `${screens.clientHeight}px`;
  // Hide expander button
  expanderButton.classList.add("active");
};
