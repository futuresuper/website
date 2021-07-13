// Apply a class to HTML if JavaScript is enabled
// so we can apply JS-dependent styles without ruining the experience for non-JS visitors
document.documentElement.className = "js";

// Handle mobile menu navigation
const siteHeader = document.querySelector('header[role="banner"]');
const menuButtonOpen = document.querySelector(".menu-button#open");
const menuButtonClose = document.querySelector(".menu-button#close");
const menuChangeElements = [document.body, siteHeader];

function showMenu(show) {
  if (show) {
    menuChangeElements.forEach((element) => {
      element.classList.add("site-header-menu-active");
    });
  } else {
    menuChangeElements.forEach((element) => {
      element.classList.remove("site-header-menu-active");
    });
  }
}

window.onload = function () {
  const referer = getQueryVariable("r");
  const refererCookie = getCookie("fsreferer");

  // console.log(referer);
  // console.log(refererCookie);

  if (referer) {
    setCookie("fsreferer", referer, 365);
    document.getElementById("referer").value = referer;
  } else if (refererCookie) {
    document.getElementById("referer").value = refererCookie;
  }

  if (referer || refererCookie) {
    const linksToJoin = document.querySelectorAll(
      '[href="https://join.futuresuper.com.au"]'
    );
    linksToJoin.forEach((el) => {
      el.setAttribute("href", "#");
      el.setAttribute("onclick", "showJoinOverlay(true)");
    });
  }
};

function showJoinOverlay(show) {
  if (show) {
    document.getElementById("join-overlay").style.display = "block";
  } else {
    document.getElementById("join-overlay").style.display = "none";
  }
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
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
  currentCustodianIndex =
    currentCustodianIndex < custodianData.length - 1
      ? currentCustodianIndex + 1
      : 0;

  custodianEls.forEach((element) => {
    element.ontransitionend = () => {
      element.textContent = custodianData[currentCustodianIndex];
      element.classList.add("active");
    };
  });

  return currentCustodianIndex;
}

setInterval(showNextCustodianName, 4000);

// Watch for and animate acknowledgement of country *in footer only*
const aocFooter = document.querySelector(".acknowledgement-of-country.footer");
const siteContent = document.querySelector("body > .flow-content");
// Use this to also control the animation of yellow text on 'Traditional Custodians'
const traditionalCustodiansInFooter = document.querySelector(
  ".acknowledgement-of-country.footer p span.traditional-custodians"
);

const config = {
  rootMargin: "-75% 0% 0% 0%",
};

let observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        aocFooter.classList.remove("active");
        traditionalCustodiansInFooter.classList.remove("active");
      } else {
        aocFooter.classList.add("active");
        traditionalCustodiansInFooter.classList.add("active");
      }
    }),
  config
);

observer.observe(siteContent);

// Show and animate acknowledgement of country *in header only*
// ...only on first visit
const aocHeader = document.querySelector(".acknowledgement-of-country.header");
// siteContent already declared above

// Local storage
const visited = localStorage.getItem("visited");
// If visiting for the first time...
if (!visited) {
  // Show acknowledgement of country in the header
  aocHeader.classList.add("active");
  // Tell siteContent to make room for it
  siteContent.classList.add("site-header-aoc-active");
  // Prepare the body so the mobile menu also makes room for it
  document.body.classList.add("site-header-aoc-active");
  // Animate the yellow text on 'Traditional Custodians' in the header
  const traditionalCustodiansInHeader = document.querySelector(
    ".acknowledgement-of-country.header p span.traditional-custodians"
  );
  traditionalCustodiansInHeader.classList.add("active");
  // Then set visited to true so it doesn't show next time
  localStorage.setItem("visited", true);
}

// Keep tooltips within viewport bounds
const pageTooltips = Array.from(document.querySelectorAll(".tooltip"));

pageTooltips.forEach((tooltip) => {
  const tooltipText = tooltip.querySelector(".tooltip-text");
  tooltip.onmouseover = checkBounds;
  tooltip.onmouseout = removeClassNames;

  function checkBounds() {
    const bounding = tooltipText.getBoundingClientRect();
    // Left side is out of viewoprt
    if (bounding.left < 0) {
      tooltipText.classList.add("left");
    }
    // Right side is out of viewport (including scrollbar)
    if (bounding.right > document.documentElement.clientWidth) {
      tooltipText.classList.add("right");
    }
  }

  function removeClassNames() {
    const classNames = ["left", "right"];
    classNames.forEach((className) => {
      if (tooltipText.classList.contains(className)) {
        tooltipText.classList.remove(className);
      }
    });
  }
});

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}
