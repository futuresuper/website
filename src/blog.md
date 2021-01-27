---
title: "Blog"
summary: "What’s new at Future Super"
layout: "layouts/blog.html"
pageStyles: ["src/css/pages/blog.css"]
data: collections.blog
permalink: "blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html"
paginationPrevText: "Newer posts"
paginationNextText: "Older posts"
paginationAnchor: "#post-list"
---
