window.onload = function () {
  const email = getQueryVariable("email");

  if (email) {
    const url =
      "https://67l8qspd50.execute-api.ap-southeast-2.amazonaws.com/prod/apunsub?email=" +
      encodeURIComponent(email);
    fetch(url, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    document.getElementById("success").style.display = "block";
  } else {
    document.getElementById("unsubscribe-form").style.display = "block";
  }
};
