// Basic/Detailed View Selector
var details = document.getElementsByClassName("details");
// Uncomment below once we're okay to show detailed view
/*
var viewSelector = document.querySelector("#detailed-info");
viewSelector.addEventListener("change", function () {
  let visibility = viewSelector.value === "detailed" ? "block" : "none";
  for (var i = 0; i < details.length; i++) {
    details[i].style.display = visibility;
  }
});
*/

// 2) Reusable function to convert any string/text to css-friendly format
var conv = function (str) {
  if (!str) {
    str = "empty";
  }
  return str
    .replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "")
    .replace(/ /g, "-")
    .toLowerCase()
    .trim();
};

// 3) Creating dynamic elements classes from its categories for filtering:
var catArray = document.querySelectorAll(".filter-category");
catArray.forEach(function (elem) {
  var text = elem.innerText || elem.innerContent;
  var className = conv(text);
  elem.parentElement.classList.add(className);
});

// 4) Creating custom data-date attributes from blog dates:
var sortArray = document.querySelectorAll(".sort-category");
sortArray.forEach(function (sortElem) {
  var sortText = sortElem.innerText || sortElem.innerContent;
  sortElem.parentElement.parentElement.setAttribute("data-date", sortText);
});

// 5) Set the reference to the container. Use the class-name of your Collection List or ID of the Collection List
var containerEl = document.querySelector(".mix-container");
var selectFilter = document.querySelector(".select-filter");
var selectSort = document.querySelector(".select-sort");

// 6) Call the MixitUp plugin

// hide alert message by deafult
var noItemsFoundMessage = document.getElementById("no-items-found-message");
noItemsFoundMessage.style.display = "none";

// hide detailed view by deafult
var details = document.getElementsByClassName("details");
for (var i = 0; i < details.length; i++) {
  details[i].style.display = "none";
}

var mixer = mixitup(containerEl, {
  multifilter: {
    enable: true, // enable the multifilter extension for the mixer
  },
  load: {
    sort: "featured:asc",
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

selectSort.addEventListener("change", function () {
  var order = selectSort.value;
  mixer.sort(order);
});
