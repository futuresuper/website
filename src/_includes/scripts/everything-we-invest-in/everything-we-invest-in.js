// Set initial message
const initialNumber = document.querySelectorAll(".table-row").length;
const resultsText = document.querySelector("#results-description");
resultsText.innerHTML =
  'Our entire portfolio is invested across <span style="font-weight: bold">' +
  initialNumber +
  "</span> assets, listed below.";

// Reusable function to convert any string/text to css-friendly format
var conv = function (str) {
  if (!str) {
    str = "empty";
  } else {
    const newStr = str
      .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
      .replace(/ /g, "-")
      .toLowerCase()
      .trim();
    // console.log(newStr);
    return newStr;
  }
};

// Creating dynamic elements classes from its categories for filtering:
var catArray = document.querySelectorAll(".filter-category");
catArray.forEach(function (elem) {
  var text = elem.innerText || elem.innerContent;
  var className = conv(text);
  elem.parentElement.classList.add(className);
});

// Creating custom data-date attributes from blog dates:
var sortArray = document.querySelectorAll(".sort-category");
sortArray.forEach(function (sortElem) {
  var sortText = sortElem.innerText || sortElem.innerContent;
  sortElem.parentElement.parentElement.setAttribute("data-date", sortText);
});

// Set the reference to the container. Use the class-name of your Collection List or ID of the Collection List
var containerEl = document.querySelector(".mix-container");
var selectFilter = document.querySelector(".select-filter");
var selectSort = document.querySelector(".select-sort");
var investmentOptionsFilter = document.querySelector(
  ".investment-options-filter"
);
var assetClassFilter = document.querySelector(".asset-class-filter");
var countryFilter = document.querySelector(".country-filter");
var businessTypeFilter = document.querySelector(".business-type-filter");

// hide alert message by deafult
var noItemsFoundMessage = document.getElementById("no-items-found-message");
noItemsFoundMessage.style.display = "none";

// Settings
let assetClass;
let country;
let businessType;
let investmentOption;

var mixer = mixitup(containerEl, {
  multifilter: {
    enable: true, // enable the multifilter extension for the mixer
  },
  load: {
    sort: "size:desc",
  },
  callbacks: {
    onMixEnd: function (state) {
      // prettier-ignore
      let matchingText = ['There are <span style="font-weight: bold">' + state.totalMatching + "</span> "];
      matchingText.push(businessType ? businessType + " " : "");
      matchingText.push(assetClass ? assetClass + " assets" : " assets");
      matchingText.push(country ? "from " + country + " " : "");
      matchingText.push(
        investmentOption
          ? "in the " + investmentOption + " option."
          : "across all investment options."
      );
      resultsText.innerHTML = matchingText.join(" ");
      // ## 3 - hasFailed true? show alert
      if (state.hasFailed) {
        noItemsFoundMessage.style.display = "block"; // ## 3 - hasFailed false? hide alert
      } else {
        noItemsFoundMessage.style.display = "none";
      }
    },
  },
});

assetClassFilter.addEventListener("change", function (e) {
  const val = assetClassFilter.value;
  assetClass =
    e.target.options[e.target.options.selectedIndex].innerText.trim();
});

countryFilter.addEventListener("change", function (e) {
  const val = countryFilter.value;
  country = e.target.options[e.target.options.selectedIndex].innerText.trim();
});

businessTypeFilter.addEventListener("change", function (e) {
  const val = businessTypeFilter.value;
  businessType =
    e.target.options[e.target.options.selectedIndex].innerText.trim();
});

// Show/hide cols based on investment option selection
investmentOptionsFilter.addEventListener("change", function (e) {
  const option = investmentOptionsFilter.value;
  console.log(e);
  investmentOption =
    e.target.options[e.target.options.selectedIndex].innerText.trim();
  resetCols();
  if (!option) {
    var colItems = document.querySelectorAll(".all-options-col");
    colItems.forEach(function (elem) {
      elem.style.display = "block";
    });
    mixer.sort("size:desc");
  } else {
    var colItems = document.querySelectorAll(option + "-col");
    colItems.forEach(function (elem) {
      elem.style.display = "block";
    });
    mixer.sort(option.slice(1) + "-weight:desc");
  }
});

function resetCols() {
  var allItems = document.querySelectorAll(".hide-on-reset");
  allItems.forEach(function (elem) {
    elem.style.display = "none";
  });
}

function showInvestmentOverlay(show) {
  if (show) {
    document.getElementById("details-overlay").style.display = "block";
  } else {
    document.getElementById("details-overlay").style.display = "none";
  }
}
