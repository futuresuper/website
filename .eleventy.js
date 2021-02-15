// Declare filters
// Date filters
const dateFilter = require("./src/filters/date-filter.js");
const w3DateFilter = require("./src/filters/w3-date-filter.js");
const timeSinceFilter = require("./src/filters/time-since-filter.js");
const year = require("./src/filters/year.js");
const month = require("./src/filters/month.js");
// JS minification filter
const { minify } = require("terser");
// CSS minification filter
const CleanCSS = require("clean-css");
// Shortcodes
const { srcset, src } = require("./src/helpers/shortcodes");
// Inline SVGs
const svgContents = require("eleventy-plugin-svg-contents");
const slugify = require("slugify");

module.exports = (config) => {
  // Watch for changes in /sass
  config.addWatchTarget("./src/sass/");
  // Take the contents of /the following directories and pass through to /dist
  config.addPassthroughCopy("./src/manifest.json");
  config.addPassthroughCopy("./src/fonts/");
  config.addPassthroughCopy("./src/images/");
  config.addPassthroughCopy("./src/admin/");
  config.addPassthroughCopy("./src/css/");
  config.addPassthroughCopy("./src/_data/custodians.json");
  config.addPassthroughCopy("_redirects");

  // Add filters to Eleventy
  // Handle dates in areas such as blog posts
  config.addFilter("dateFilter", dateFilter);
  config.addFilter("w3DateFilter", w3DateFilter);
  config.addFilter("timeSinceFilter", timeSinceFilter);
  config.addFilter("year", year);
  config.addFilter("month", month);
  // Custom currency filter for fees
  config.addFilter("currency", (stringOrNumber) => {
    return parseFloat(stringOrNumber).toFixed(2);
  });

  // Return a collection of blog posts in reverse date order
  config.addCollection("blog", (collection) => {
    return [...collection.getFilteredByGlob("./src/posts/*.md")].reverse();
  });

  // Return a collection of careers
  config.addCollection("careers", (collection) => {
    return [...collection.getFilteredByGlob("./src/careers/*.md")];
    // TODO: filter-out items that have an endDate older than today
    // ...or a startDate in the future
    // TODO: rerun this function automatically, often
  });

  // Return a collection of FAQs
  config.addCollection("faqs", (collection) => {
    return collection
      .getFilteredByGlob("./src/faqs/*.md")
      .sort((a, b) => b.data.order - a.data.order)
      .reverse();
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

  // Return a collection of all Markdown documents and forms
  // For use when cross-linking to documents and forms from other pages such as Employers
  config.addCollection("allDocumentsAndForms", (collection) => {
    return (
      collection
        .getFilteredByGlob("./src/documents-and-forms/*/*.md")
        // TODO: sort by section (subfolder), then data.order
        .sort((a, b) => b.data.order - a.data.order)
        .reverse()
    );
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

  // Override default 'Slug' filter with below options required to work properly
  // https://github.com/11ty/eleventy/issues/278#issuecomment-451105828
  config.addFilter("slug", (input) => {
    const options = {
      replacement: "-",
      remove: /[&,+()$~%.'":*?<>{}#]/g,
      lower: true,
    };
    return slugify(input, options);
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
