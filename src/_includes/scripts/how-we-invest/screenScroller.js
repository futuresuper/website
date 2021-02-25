const buttons = document.querySelectorAll(".scroll-buttons button");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const screensList = document.querySelector(".screens .buttons-container");
const scrollJumpDistance = screensList.clientWidth * 0.75;

leftButton.onclick = function () {
  screensList.scrollBy({
    left: -scrollJumpDistance,
    behavior: "smooth",
  });
  manageButtonStates("left");
};

rightButton.onclick = function () {
  screensList.scrollBy({
    left: scrollJumpDistance,
    behavior: "smooth",
  });
  manageButtonStates("right");
};

const manageButtonStates = function (direction) {
  // Do checking of position in here (instead of relying on screensList.scrollLeft)
  // as the smooth animation behavior causes a delay in the math there
  // This could also be done via promise and .then
  let newScrollPosition = 0;
  if (direction === "left") {
    newScrollPosition = screensList.scrollLeft - scrollJumpDistance;
  } else if (direction === "right") {
    newScrollPosition = screensList.scrollLeft + scrollJumpDistance;
  }

  //   If there is room on the left to scroll to...
  if (newScrollPosition > 0) {
    //   Visually enable the scroll left button
    leftButton.classList.add("active");
  } else {
    //   Visually disable the scroll left button
    leftButton.classList.remove("active");
  }

  //   If there is no more room on the right to scroll...
  if (screensList.scrollWidth - newScrollPosition < screensList.clientWidth) {
    //   Visually disable the scroll right button
    rightButton.classList.remove("active");
  } else {
    //   Visually enable the scroll right button
    rightButton.classList.add("active");
  }
};
