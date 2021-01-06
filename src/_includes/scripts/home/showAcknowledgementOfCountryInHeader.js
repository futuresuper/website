const aocHeader = document.querySelector(".acknowledgement-of-country.header");
const siteHeader = document.querySelector("header[role='banner']");

// Local storage
const alreadyVisited = localStorage.getItem("alreadyVisited");
// If visiting for the first time...
if (!alreadyVisited) {
  // Show acknowledgement of country in the header
  aocHeader.classList.add("active");
  siteHeader.classList.add("aoc-active");
  // Then set alreadyVisited to true so it doesn't show next time
  localStorage.setItem("alreadyVisited", true);
}
