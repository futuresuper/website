# Website

This repository contains the [Eleventy](https://www.11ty.dev) prototype of the [Future Super website](https://www.futuresuper.com.au/).

## Installation

Run:

```shell
npm install
```

...to install dependencies declared in package.json.

## Usage

Run:

```shell
npm start
```

Then open [localhost:8080](http://localhost:8080) in your browser of choice.

## Structure

- **dist**: the public directory that Eleventy builds and outputs files to
- **src**: the input directory that Eleventy reads from
  - **/data**: Eleventy-recognised directory for site-wide data files
  - **/includes**: Eleventy-recognised directory site-wide layouts and partial layouts
  - **/sass**: Sass-flavoured stylesheets, watched and turned into CSS by Eleventy

## Todo

### High priority

- [ ] Figure out how best to create client-side JavaScript such as the Negative Screens picker, probably using a single [data file](https://bryanlrobinson.com/blog/using-eleventys-javascript-data-files/) that both can be read by Eleventy to populate a page (via Nunjucks) and can be read by JavaScript to allow changes based on user interaction

### Low priority

- [ ] Subset fonts automatically on build using [glyphhanger](https://github.com/filamentgroup/glyphhanger)
