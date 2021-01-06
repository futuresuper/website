const aocHeader = document.querySelector(".acknowledgement-of-country.header");
// siteContent already declared in global.js

// Local storage
const alreadyVisited = localStorage.getItem("alreadyVisited");
// If visiting for the first time...
if (!alreadyVisited) {
  // Show acknowledgement of country in the header
  aocHeader.classList.add("active");
  // Tell siteContent to make room for it
  siteContent.classList.add("aoc-active");
  // Prepare the body so the mobile menu also makes room for it
  document.body.classList.add("aoc-active");
  // Then set alreadyVisited to true so it doesn't show next time
  localStorage.setItem("alreadyVisited", true);
}
