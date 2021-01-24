// Declare filters
// Date filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");
const timeSinceFilter = require("./src/filters/time-since-filter.js");
// JS minification filter
const { minify } = require("terser");
// CSS minification filter
const CleanCSS = require("clean-css");
// Shortcodes
const { srcset, src } = require("./src/helpers/shortcodes");
// Inline SVGs
const svgContents = require("eleventy-plugin-svg-contents");

module.exports = (config) => {
  // Watch for changes in /sass
  config.addWatchTarget("./src/sass/");
  // Take the contents of /the following directories and pass through to /dist
  config.addPassthroughCopy("./src/fonts/");
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/admin/");
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/_data/custodians.json");

  // Add filters to Eleventy
  // Handle dates in areas such as blog posts
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);
  config.addFilter("timeSinceFilter", timeSinceFilter);
  // Custom currency filter for fees
  config.addFilter("currency", (stringOrNumber) => {
    return parseFloat(stringOrNumber).toFixed(2);
  });

  // Return a collection of blog posts in reverse date order
  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Return a collection of FAQs
  // TODO; replace with dynamic collection from Groove Knowledge Base
  config.addCollection("faqs", (collection) => {
    return [...collection.getFilteredByGlob("./src/faqs/*.md")];
  });

  // Return a collection of FAQs
  // TODO; replace with dynamic collection from Groove Knowledge Base
  config.addCollection("documentsAndFormsCollection", (collection) => {
    return [...collection.getFilteredByGlob("./src/documentsAndForms/*.md")];
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

  config.addPlugin(svgContents);

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
