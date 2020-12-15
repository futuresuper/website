// Declare filters
// Date filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");
// JS minification filter
const { minify } = require("terser");
// CSS minification filter
const CleanCSS = require("clean-css");
// Shortcodes
const { srcset, src } = require("./src/helpers/shortcodes");

module.exports = (config) => {
  // Watch for changes in /sass
  config.addWatchTarget("./src/sass/");
  // Take the contents of /the following directories and pass through to /dist
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/fonts/");
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/admin/");

  // Add filters to Eleventy
  // Handle dates in areas such as blog posts
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);

  // Return a collection of blog posts in reverse date order
  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Return a collection of homepage sections
  // TODO: why is this collection being shown in reverse order locally but not externally?
  config.addCollection("homeSections", (collection) => {
    return [...collection.getFilteredByGlob("./src/home-sections/*.md")];
  });

  // Allow JavaScript to be minified via the jsmin Nunjucks filter
  // https://www.11ty.dev/docs/quicktips/inline-js/
  config.addNunjucksAsyncFilter("jsmin", async function (code, callback) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  config.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  config.addShortcode("src", src);
  config.addShortcode("srcset", srcset);

  return {
    // Tell Eleventy to process Markdown, data, and HTML with Nunjucks
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    // Set which directories Eleventy reads from and writes to
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
