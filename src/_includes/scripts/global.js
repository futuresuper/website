// Apply a class to HTML if JavaScript is enabled
// so we can apply JS-dependent styles without ruining the experience for non-JS visitors
document.documentElement.className = "js";

// Handle mobile menu navigation
const logoEl = document.querySelector(".logo svg");
const navContainer = document.querySelector(".nav-container");
const menuCloseButton = document.querySelector("#menu-close-button");
const menuOpenButton = document.querySelector("#menu-open-button");
const menuChangeElements = [document.body, logoEl, navContainer, menuCloseButton, menuOpenButton];

function showMobileMenu(show) {
  if (show) {
    menuChangeElements.forEach((element) => {
      element.classList.add("mobile-menu-active");
    });
  } else {
    menuChangeElements.forEach((element) => {
      element.classList.remove("mobile-menu-active");
    });
  }
}

// Rotate custodians in acknowledgement of country (both header and footer)
let currentCustodianIndex = 0;
// There may be 2 of these custodian elements (header and footer)
// Therefore treat as group
const custodianEls = document.querySelectorAll("p.custodian");
custodianEls.forEach((element) => element.classList.add("active"));

async function fetchCustodianData() {
  const response = await fetch("/_data/custodians.json");
  return response.json();
}

async function showNextCustodianName() {
  let custodianData = await fetchCustodianData();
  custodianEls.forEach((element) => {
    element.textContent = custodianData[currentCustodianIndex];
    element.classList.remove("active");
  });
  currentCustodianIndex = currentCustodianIndex < custodianData.length - 1 ? currentCustodianIndex + 1 : 0;

  custodianEls.forEach((element) => {
    element.ontransitionend = () => {
      element.textContent = custodianData[currentCustodianIndex];
      element.classList.add("active");
    };
  });

  return currentCustodianIndex;
}

setInterval(showNextCustodianName, 4000);

// Watch for and animate acknowledgement of country (footer only)
const aocFooterContainer = document.querySelector(".acknowledgement-of-country.footer .container");
const siteContent = document.querySelector("body > .content");
const config = {
  rootMargin: "-75% 0% 0% 0%",
};

let observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aocFooterContainer.classList.remove("active");
      } else {
        aocFooterContainer.classList.add("active");
      }
    }),
  config
);

observer.observe(siteContent);
