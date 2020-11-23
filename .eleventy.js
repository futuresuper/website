// Declare filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

module.exports = config => {
    // Add filters to Eleventy
    config.addFilter('dateFilter', dateFilter);
    config.addFilter('w3DateFilter', w3DateFilter);

    // Sets directories to pass through to the dist folder
    config.addPassthroughCopy('./src/images/');

    // Returns a collection of blog posts in reverse date order
    config.addCollection('blog', collection => {
        return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
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