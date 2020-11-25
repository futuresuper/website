// Declare filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

const { minify } = require("terser");

module.exports = config => {
    // Watch for changes in /sass
    config.addWatchTarget("./src/sass/")
    // Take the contents of /the following directories and pass through to /dist
    config.addPassthroughCopy("./src/css/")
    config.addPassthroughCopy('./src/fonts/');
    config.addPassthroughCopy('./src/images/');
    // TEMP: Do the same for the negative screens, which are acted on by client-side JS
    config.addPassthroughCopy('./src/data-passed-to-client/');
    // TODO Change above to publicly accessible collection based on what's in screens.js(on)
    // Because otherwise we have two sources of the same information (the other being in _data/screens.js)
    // I.e:
    // config.addCollection('negativeScreens', collection => {
    //     return [...collection.doSomethingTo('path/to/screens.js')];
    // });

    // Add filters to Eleventy
    // Handle dates in areas such as blog posts
    config.addFilter('dateFilter', dateFilter);
    config.addFilter('w3DateFilter', w3DateFilter);

    // Return a collection of blog posts in reverse date order
    config.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
    });

    // Return a collection of homepage sections
    config.addCollection('homeSections', collection => {
        return [...collection.getFilteredByGlob('./src/home-sections/*.md')].reverse();
    });

    // Allow JavaScript to be minified via the jsmin Nunjucks filter
    // https://www.11ty.dev/docs/quicktips/inline-js/
    config.addNunjucksAsyncFilter("jsmin", async function (
        code,
        callback
    ) {
        try {
            const minified = await minify(code);
            callback(null, minified.code);
        } catch (err) {
            console.error("Terser error: ", err);
            // Fail gracefully.
            callback(null, code);
        }
    });

    return {
        // Tell Eleventy to process Markdown, data, and HTML with Nunjucks
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        // Set which directories Eleventy reads from and writes to
        dir: {
            input: 'src',
            output: 'dist'
        }
    };
};