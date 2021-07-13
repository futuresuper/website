function hideBox() {
  document.getElementById("donation-offer").style.display = "none";
}

window.addEventListener(
  "load",
  function () {
    let referer = getQueryVariable("r");
    if (referer) {
      const firstName =
        referer[0].toUpperCase() + referer.slice(1, referer.indexOf("-"));
      document.getElementById("friend-name").innerText = firstName + " ";
    }
  },
  false
);
