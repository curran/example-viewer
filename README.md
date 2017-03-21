# example-viewer
A presentation tool for code examples. Built using [Redux](http://redux.js.org/) and [D3](https://d3js.org/).

**[Try it out!](https://curran.github.io/d3-in-motion/#1/4/9)**

[![image](https://cloud.githubusercontent.com/assets/68416/24115030/1a8ce99c-0dc8-11e7-8608-764fab3e7454.png)](https://curran.github.io/d3-in-motion/#1/4/9)

The above link shows examples in [d3-in-motion](https://github.com/curran/d3-in-motion), a project containing examples only, that uses this example-viewer package for presentation.

Features:

 * CTRL + Right/Left arrow keys to navigate between examples.
 * Live code editing environment with instant feedback.
 * Click on a number to get a slider.
 * Click on hex colors to get a color picker.

# For Authors

This tool is not only for presentation, but also for creation.

 * CTRL + S will save the current example
 * CTRL + I create (insert) a new example

For these to work, you'll need to start the server locally with

```
npm start
```

This server uses [Express](http://expressjs.com/) and [Node.js](https://nodejs.org/en/) to write the examples to the file system.

To create a new project that just contains the content, and uses this package via NPM, create a new project and run

```
npm init
npm install -S example-viewer
```

In your `package.json` file, you can set up the example viewer to be your startup script:

```
  "scripts": {
    "start": "example-viewer"
  }
```

Then when you run `npm start` in your project, the `index.html` from this package will be copied into the root of your project, and the server will be started so you can save files.

Once example of a project that depends on this module is [d3-in-motion](https://github.com/curran/d3-in-motion).
