const aocHeader = document.querySelector(".acknowledgement-of-country.header");
// siteContent already declared in global.js

// Local storage
const visited = localStorage.getItem("visited");
// If visiting for the first time...
if (!visited) {
  // Show acknowledgement of country in the header
  aocHeader.classList.add("active");
  // Tell siteContent to make room for it
  siteContent.classList.add("aoc-active");
  // Prepare the body so the mobile menu also makes room for it
  document.body.classList.add("aoc-active");
  // Animate the yellow text on 'Traditional Custodians' in the header
  const traditionalCustodiansInHeader = document.querySelector(".acknowledgement-of-country.header p span.traditional-custodians");
  traditionalCustodiansInHeader.classList.add("active");
  // Then set visited to true so it doesn't show next time
  localStorage.setItem("visited", true);
}
