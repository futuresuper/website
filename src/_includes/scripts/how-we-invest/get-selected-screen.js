const formEl = document.getElementById('screens-form');
const outputEl = document.getElementById('selected-screen');

console.log("hello from get-selected-screen!")

formEl.addEventListener('change', e => {
    // update the outputEl with the currently selected item
    outputEl.textContent = formEl.screen.value
});