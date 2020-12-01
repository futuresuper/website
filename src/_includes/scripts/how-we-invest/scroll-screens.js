const leftButton = document.getElementById("left")
const rightButton = document.getElementById("right")

leftButton.onclick = function () {
    if (formEl.scrollLeft) {
        formEl.scrollBy({
            left: -200,
            behavior: 'smooth'
        })
    } else {
        // Scroll container all the way left
        // TODO: disable button
    }

};

rightButton.onclick = function () {
    formEl.scrollBy({
        left: 200,
        behavior: 'smooth'
    })
};