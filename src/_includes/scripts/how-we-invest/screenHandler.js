const screensContainer = document.querySelector(".screens-container");
const expanderButton = document.querySelector("button.expander");
const screens = document.querySelector(".screens");
const allCriteriaContainers = document.querySelectorAll(".criteria-container");
const screensTooltipContainer = document.querySelector(".perma-tooltip-container");

let screensContainerExpanded = false;

// Create function for handling screen container expansion from its minified state
function expandScreenContainer() {
  // Open screens container
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
  allCriteriaContainers.forEach((element) => {
    // If this element matches the one clicked...
    if (element.id === screen) {
      // Make selected screen active
      element.classList.add("active");
    } else {
      // And turn the rest off
      element.classList.remove("active");
    }
  });
  // Hide tooltip now that visitor has interacted
  screensTooltipContainer.classList.add("active");
  // If it's not already...
  if (!screensContainerExpanded) {
    // Automatically expand screen container
    expandScreenContainer();
  }
}
