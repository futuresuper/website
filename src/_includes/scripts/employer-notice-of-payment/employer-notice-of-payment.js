function validateNOP() {
  const sg =
    parseFloat(document.getElementById("SG-Amount").value) > 0
      ? parseFloat(document.getElementById("SG-Amount").value)
      : 0;
  const ss =
    parseFloat(document.getElementById("Salary-Sacrifice-Amount").value) > 0
      ? parseFloat(document.getElementById("Salary-Sacrifice-Amount").value)
      : 0;
  const ea =
    parseFloat(document.getElementById("Employer-Additional-Amount").value) > 0
      ? parseFloat(document.getElementById("Employer-Additional-Amount").value)
      : 0;
  const mc =
    parseFloat(document.getElementById("Member-Contribution-Amount").value) > 0
      ? parseFloat(document.getElementById("Member-Contribution-Amount").value)
      : 0;

  const total = parseFloat(sg + ss + ea + mc)
    .toFixed(2)
    .toLocaleString("en");
  document.getElementById("total").innerHTML = "$" + total;
  document.getElementById("Total-Contribution").value = total;
}
