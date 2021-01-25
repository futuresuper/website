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

  // TODO: Map through every repeated collection below, dynamically
  // Return a collection of just the documents and forms for the fund
  config.addCollection("fundDocumentsAndForms", (collection) => {
    return collection
      .getFilteredByGlob("./src/documents-and-forms/fund/*.md")
      .sort((a, b) => b.data.order - a.data.order)
      .reverse();
  });

  // Return a collection of just the documents and forms for individuals
  config.addCollection("individualsDocumentsAndForms", (collection) => {
    return collection
      .getFilteredByGlob("./src/documents-and-forms/individuals/*.md")
      .sort((a, b) => b.data.order - a.data.order)
      .reverse();
  });

  // Return a collection of just the documents for pension plan
  config.addCollection("pensionDocuments", (collection) => {
    return collection
      .getFilteredByGlob("./src/documents-and-forms/pension-documents/*.md")
      .sort((a, b) => b.data.order - a.data.order)
      .reverse();
  });

  // Return a collection of just the forms for pension plan
  config.addCollection("pensionForms", (collection) => {
    return collection
      .getFilteredByGlob("./src/documents-and-forms/pension-forms/*.md")
      .sort((a, b) => b.data.order - a.data.order)
      .reverse();
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
