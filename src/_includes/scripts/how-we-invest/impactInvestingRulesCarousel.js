new Glide(".glide", {
  type: "carousel",
  autoplay: 8000,
  animationDuration: 600,
  dragThreshold: 16,
  // *Larger* than $breakpoint-lg
  gap: 64, // px between each item
  peek: 64, // px on side margins
  perView: 3,
  breakpoints: {
    // $breakpoint-lg and *smaller*
    1280: {
      gap: 24,
      peek: 24,
      perView: 3,
    },
    // $breakpoint-md and *smaller*
    768: {
      gap: 16,
      peek: 40,
      perView: 1,
    },
  },
}).mount();
