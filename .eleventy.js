// Declare filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

module.exports = config => {
    // Watch for changes in /sass
    config.addWatchTarget("./src/sass/")
    // Take the contents of /css and pass through to /dist
    config.addPassthroughCopy("./src/css/")

    // Sets directories to pass through to the dist folder
    config.addPassthroughCopy('./src/fonts/');
    config.addPassthroughCopy('./src/images/');

    // Add filters to Eleventy
    config.addFilter('dateFilter', dateFilter);
    config.addFilter('w3DateFilter', w3DateFilter);

    // Returns a collection of blog posts in reverse date order
    config.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
    });

    // Returns a collection of homepage sections
    config.addCollection('homeSections', collection => {
        return [...collection.getFilteredByGlob('./src/home-sections/*.md')].reverse();
    });

    return {
        // Tells Eleventy to process Markdown, data, and HTML with Nunjucks
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