function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

function copyShareLink() {
  let rcode = getQueryVariable("r");
  const url = rcode
    ? "https://www.futuresuper.com.au/letter?r=" + rcode
    : "https://www.futuresuper.com.au/letter";
  copyTextToClipboard(url);
  document.getElementById("success-banner").style.display = "flex";
  setTimeout(() => {
    document.getElementById("success-banner").style.display = "none";
  }, 2000);
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

async function getData(url = "") {
  const response = await fetch(url);
  return response.json(); // parses JSON response into native JavaScript objects
}

let referer = getQueryVariable("r");
let fname = getQueryVariable("first");
let fund = getQueryVariable("fund");
let share = getQueryVariable("share") ? true : false;
console.log("REFERER: " + referer);
console.log("SHARE: " + share);
console.log("FIRST: " + fname);
console.log("FUND: " + fund);

if (share) {
  document.getElementById("join").style.display = "none";
  document.getElementById("title-shared").style.display = "none";
  if (referer) {
    document.getElementById("rcode").innerHTML = referer;
    console.log("Posting letter...");
    postData(
      "https://67l8qspd50.execute-api.ap-southeast-2.amazonaws.com/prod/letter?rcode=" +
        referer
    ).then((data) => {
      console.log(data);
    });
  }
  if (fname) {
    document.getElementById("name1").innerHTML = " " + fname;
    document.getElementById("signature").innerHTML = "Signed,<br/>" + fname;
  }
  if (fund) {
    document.getElementById("fund").innerHTML = fund;
  }
} else {
  document.getElementById("share").style.display = "none";
  document.getElementById("title-sender").style.display = "none";
  if (referer) {
    console.log("Getting letter details...");
    getData(
      "https://67l8qspd50.execute-api.ap-southeast-2.amazonaws.com/prod/letterdetails?rcode=" +
        referer
    ).then((data) => {
      console.log(data);
      document.getElementById("name2").innerHTML = " " + data.firstName;
      document.getElementById("signature").innerHTML =
        "Signed,<br/>" + data.firstName;
      document.getElementById("fund").innerHTML = data.oldFund;
    });
  }
}

function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
