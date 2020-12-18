function showMobileMenu(show) {
  if (show) {
    document.getElementById("nav-container").style.display = "flex";
    document.getElementById("menu-close-button").style.display = "flex";
    document.getElementById("menu-button").style.display = "none";
  } else {
    document.getElementById("nav-container").style.display = "none";
    document.getElementById("menu-close-button").style.display = "none";
    document.getElementById("menu-button").style.display = "flex";
  }
}
