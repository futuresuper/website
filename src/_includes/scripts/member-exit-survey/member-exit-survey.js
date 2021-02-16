window.onload = function () {
  const fname = getQueryVariable("fname");
  const email = getQueryVariable("email");
  if (fname) {
    document.getElementById("name").value = fname;
  }
  if (email) {
    document.getElementById("email").value = email;
  }
};
