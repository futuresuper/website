const screensContainer = document.querySelector(".screens-container");
const expanderButton = document.querySelector("button.expander");
const screens = document.querySelector(".screens");

let screensContainerExpanded = false;

// Create function for handling screen container expansion from its minified state
function expandScreenContainer() {
  // Open screens container
  // Set to same height as its child contents
  // screensContainer.style.maxHeight = `${screens.offsetHeight}px`;
  screensContainer.classList.add("active");
  // Hide expander button
  expanderButton.classList.add("active");

  // Update variable
  screensContainerExpanded = true;
}

// Call this function when the expander button is clicked
expanderButton.onclick = expandScreenContainer;

// Handle criteria switching
function showScreen(screen) {
  // Switch criteria
  const screenContainers = document.getElementsByClassName("criteria-container");
  for (let i = 0; i < screenContainers.length; i++) {
    screenContainers[i].style.display = "none";
  }
  document.getElementById(screen).style.display = "block";

  // If it's not already...
  if (!screensContainerExpanded) {
    // Automatically expand screen container
    expandScreenContainer();
  }
}
