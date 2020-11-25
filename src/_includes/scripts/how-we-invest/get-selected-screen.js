/*
* This script is designed to allow a visitor to /how-we-invest
* to browse through the negative screens and see their criteria.
*
* It currently imports data from a public source, which is 
* different to the source from which the radio buttons are created.
* They should ideally both read from the same source.
*/

const formEl = document.getElementById('screens-form');
const outputEl = document.getElementById('selected-screen');
const criteriaContainer = document.getElementById('criteria-container');
import data from "/data-passed-to-client/screens.js"


formEl.addEventListener('change', e => {
    // update the outputEl with the currently selected item
    outputEl.textContent = formEl.screen.value

    // Show screen criteria
    Array.from(data.items).forEach((item) => {
        if (item.name === formEl.screen.value) {
            // console.log("Matched", item.name, "to", formEl.screen.value)
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
});