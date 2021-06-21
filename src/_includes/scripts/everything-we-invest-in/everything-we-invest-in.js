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

// hide alert message by deafult
var noItemsFoundMessage = document.getElementById("no-items-found-message");
noItemsFoundMessage.style.display = "none";

// Settings
var mixer = mixitup(containerEl, {
  multifilter: {
    enable: true, // enable the multifilter extension for the mixer
  },
  load: {
    sort: "size:desc",
  },
  callbacks: {
    onMixEnd: function (state) {
      // ## 3 - hasFailed true? show alert
      if (state.hasFailed) {
        noItemsFoundMessage.style.display = "block"; // ## 3 - hasFailed false? hide alert
      } else {
        noItemsFoundMessage.style.display = "none";
      }
    },
  },
});

// Show/hide cols based on investment option selection
investmentOptionsFilter.addEventListener("change", function () {
  resetCols();
  var colItems = document.querySelectorAll(
    investmentOptionsFilter.value + "-col"
  );
  colItems.forEach(function (elem) {
    elem.style.display = "block";
  });
  mixer.sort("balanced-index-weight:desc");
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
