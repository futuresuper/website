const leftButton = document.getElementById("left")
const rightButton = document.getElementById("right")

leftButton.onclick = function () {
    if (form.scrollLeft) {
        form.scrollBy({
            left: -200,
            behavior: 'smooth'
        })
    } else {
        // Scroll container all the way left
        // TODO: disable button
    }

};

rightButton.onclick = function () {
    form.scrollBy({
        left: 200,
        behavior: 'smooth'
    })
};