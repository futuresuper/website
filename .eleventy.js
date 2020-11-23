module.exports = config => {
    // Sets directories to pass through to the dist folder
    config.addPassthroughCopy('./src/images/');
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