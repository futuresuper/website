/*
* This script is designed to allow a visitor to /how-we-invest
* to browse through the negative screens and see their criteria.
*/

const formEl = document.getElementById('screens-form');
const screenTitleEl = document.getElementById('selected-screen-title');
const criteriaContainer = document.getElementById('criteria-container');


// Function for accessing screens data
async function fetchData() {
    const response = await fetch("/_data/screens.json")
    const json = await response.json();
    return json
}

// Run at load
refreshCriteriaContent()
// Then check for changes
formEl.addEventListener('change', e => {
    // Update the criteria content
    refreshCriteriaContent()

})

// Core function for updating the screening content below the selects
async function refreshCriteriaContent() {
    let data = await fetchData()
    // Remove old screen criteria
    criteriaContainer.classList.remove("is-visible");
    screenTitleEl.classList.remove("is-visible");

    setTimeout(function () {
        while (criteriaContainer.firstChild) {
            criteriaContainer.removeChild(criteriaContainer.firstChild);
        }
        // Add new screen criteria
        showNewScreenContent(data);
    }, 250)

    setTimeout(function () {
        criteriaContainer.classList.add("is-visible");
        screenTitleEl.classList.add("is-visible");
    }, 500)


}

function showNewScreenContent(screensData) {
    /// Update the screenTitleEl with the currently selected item
    screenTitleEl.textContent = formEl.screen.value
    // Show new screen criteria
    Array.from(screensData.items).forEach((item) => {
        if (item.name === formEl.screen.value) {
            item.criteria.map((i) => {
                const criteriaItem = document.createElement("div");
                criteriaItem.classList.add("criteria")

                const question = document.createElement("p");
                question.textContent = i.question;
                question.classList.add("question");
                const examplelabel = document.createElement("p")
                examplelabel.textContent = "Failing examples include..."
                examplelabel.classList.add("example-label")
                const examplesContainer = document.createElement("ul");
                examplesContainer.classList.add("examples")

                const examples = i.examples;
                examples.map((i) => {
                    const exampleItem = document.createElement("li");
                    exampleItem.textContent = i;
                    examplesContainer.appendChild(exampleItem);
                });

                criteriaItem.appendChild(question);
                criteriaItem.append(examplelabel);
                criteriaItem.appendChild(examplesContainer);
                criteriaContainer.appendChild(criteriaItem);
            });
        }
    })
}
