const faqsContainer = document.getElementById("faqs-container");
const faqResults = document.getElementsByClassName("faq-result");
const clearButton = document.getElementById("clear-button");
const divider = document.getElementById("divider");
const noMatchesFound = document.getElementById("no-matches-found");
const searchBox = document.getElementById("faq-search-box");

faqsContainer.style.display = "none";
clearButton.style.display = "none";
divider.style.display = "none";
noMatchesFound.style.display = "none";

function updateSearchResults() {
  let value = searchBox.value.toLowerCase();
  if (value.length > 2) {
    faqsContainer.style.display = "block";
    clearButton.style.display = "block";
    divider.style.display = "block";

    // Loop through all results and hide the ones that don't match
    let numMatches = 0;
    for (i = 0; i < faqResults.length; i++) {
      const result = faqResults[i];
      if (result) {
        if (
          result.attributes["data-result"].value.toLowerCase().indexOf(value) >
          -1
        ) {
          faqResults[i].style.display = "block";
          numMatches++;
        } else {
          faqResults[i].style.display = "none";
        }
      }
    }
    if (numMatches > 0) {
      noMatchesFound.style.display = "none";
    } else {
      noMatchesFound.style.display = "block";
    }
  } else {
    faqsContainer.style.display = "none";
    clearButton.style.display = "none";
    divider.style.display = "none";
    noMatchesFound.style.display = "none";
  }
}

function clearResults() {
  searchBox.value = "";
  faqsContainer.style.display = "none";
  clearButton.style.display = "none";
  divider.style.display = "none";
  noMatchesFound.style.display = "none";
}
