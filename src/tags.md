---
pagination:
  data: collections
  size: 1
  alias: tag
  filter:
    - post
    - posts
    - blog
    - careers
    - faqs
    - documentsAndForms
    - authors
layout: "layouts/blog.html"
pageStyles: ["src/css/pages/blog.css"]
eleventyComputed:
  title: Tag | {{ tag }}
permalink: /tags/{{ tag | slug }}/
---
