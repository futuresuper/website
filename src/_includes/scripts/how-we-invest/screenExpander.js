const screensContainer = document.querySelector(".screens-container");
const expanderButton = document.querySelector("button.expander");
const screens = document.querySelector(".screens");
let screensClosed = true;

expanderButton.onclick = function () {
  // If the screens container is closed/collapsed...
  console.log("screensClosed is", screensClosed);

  if (screensClosed) {
    console.log("the full height is...", screens.clientHeight);
    // Open screens container
    screens.style.paddingBottom = `calc(${expanderButton.clientHeight}px + 2rem)`;
    console.log("the full height with padding is...", screens.clientHeight);
    screensContainer.style.maxHeight = `${screens.clientHeight}px`;

    console.log("the end height is...", screens.clientHeight);
    // console.log(screensContainer.style.height);
    // screensContainer.classList.add("active");
    expanderButton.classList.add("active");
    // Add some extra space at the bottom to accommodate for the expander button
    // screensContainer.style.paddingBottom = "4rem";

    // Update the button text
    expanderButton.textContent = "Show less";
    // Update the variable for next time click
    screensClosed = false;
    // If the screens container is open...
  } else {
    // Close screens container
    screens.style.paddingBottom = "inherit";
    screensContainer.style.maxHeight = "64vh";
    // console.log(screensContainer.style.height);
    // screensContainer.classList.remove("active");

    // screensContainer.onanimationend = () => {
    expanderButton.classList.remove("active");
    //   screensContainer.style.paddingBottom = "0";
    // };

    // Update the button text
    expanderButton.textContent = "Show more";

    // Update the variable for next time click

    screensClosed = true;
  }
};
