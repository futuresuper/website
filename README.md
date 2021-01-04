# futuresuper.com.au

The [Future Super website](https://www.futuresuper.com.au/), built with [Eleventy](https://www.11ty.dev).

## Installation

Install all dependencies by running:

```shell
npm install
```

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
