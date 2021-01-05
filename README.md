# futuresuper.com.au

The [Future Super website](https://www.futuresuper.com.au/), built with [Eleventy](https://www.11ty.dev).

## Installation

Install dependencies by running:

```shell
npm install
```

## Usage

Spin up a local instance of this site by running:

```shell
npm start
```

Then open [localhost:8080](http://localhost:8080) in your browser of choice.

## Structure

- **src**: the input directory that Eleventy reads from
  - **/\_data**: Eleventy-recognised directory for site-wide data files
  - **/\_includes**: Eleventy-recognised directory site-wide layouts and partial layouts
  - **/sass**: Sass-flavoured stylesheets, watched and turned into CSS by Eleventy
- **dist**: the output directory that Eleventy builds and outputs files to
