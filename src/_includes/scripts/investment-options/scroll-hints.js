// Enable all by default only if JavaScript is enabled
const allScrollHints = Array.from(document.querySelectorAll(".scroll-hint"));
allScrollHints.forEach((element) => element.classList.add("active"));

// Remove them one-by-one when their parent container is scrolled
// Called via an `onscroll`
function removescrollhint(targetScrollHint) {
  const target = document.getElementById(targetScrollHint);
  if (target.classList.contains("active")) {
    target.classList.remove("active");
    target.ontransitionend = () => {
      target.classList.add("hidden");
    };
  }
}
