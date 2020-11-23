// This filter formats dates into an ISO format
// It is used for <time> elements in places such as blog posts
module.exports = value => {
    const dateObject = new Date(value);

    return dateObject.toISOString();
};