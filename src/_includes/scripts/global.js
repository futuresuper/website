// Handle mobile menu navigation
function showMobileMenu(show) {
  if (show) {
    document.getElementById("nav-container").style.display = "flex";
    document.getElementById("menu-close-button").style.display = "flex";
    document.getElementById("menu-button").style.display = "none";
  } else {
    document.getElementById("nav-container").style.display = "none";
    document.getElementById("menu-close-button").style.display = "none";
    document.getElementById("menu-button").style.display = "flex";
  }
}

// Rotate custodians in footer acknowledgement of country
let currentCustodianIndex = 0;
const custodianEl = document.querySelector("p#custodian");
custodianEl.classList.add("active");

async function fetchCustodianData() {
  const response = await fetch("/_data/custodians.json");
  return response.json();
}

async function showNextCustodianName() {
  let custodianData = await fetchCustodianData();
  custodianEl.textContent = custodianData[currentCustodianIndex];
  custodianEl.classList.remove("active");
  currentCustodianIndex = currentCustodianIndex < custodianData.length - 1 ? currentCustodianIndex + 1 : 0;

  custodianEl.ontransitionend = () => {
    custodianEl.textContent = custodianData[currentCustodianIndex];
    custodianEl.classList.add("active");
  };

  return currentCustodianIndex;
}

setInterval(showNextCustodianName, 4000);

// Watch for and animate footer acknowledgement of country
const aocContainer = document.querySelector(".acknowledgement-of-country .container");
const siteContent = document.querySelector("body > .content");
const config = {
  rootMargin: "-60% 0 0 0",
};

let observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aocContainer.classList.remove("active");
      } else {
        aocContainer.classList.add("active");
      }
    }),
  config
);

observer.observe(siteContent);
