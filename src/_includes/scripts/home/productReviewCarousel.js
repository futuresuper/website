new Glide(".glide", {
  type: "carousel",
  autoplay: 4000,
  animationDuration: 600,
  gap: 200, // px between each item
  peek: 72, // px on side margins
  perView: 2,
  breakpoints: {
    // $breakpoint-lg
    1280: {
      gap: 0,
      peek: 16,
      perView: 1,
    },
  },
}).mount();
