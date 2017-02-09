# example-viewer
A presentation tool for code examples. Built using [Redux](http://redux.js.org/) and [D3](https://d3js.org/).

#[Try it out!](https://curran.github.io/example-viewer/#1/1/3)

 * CTRL + Right/Left arrow keys to navigate between examples.
 * Live code editing environment with instant feedback.
 * Click on a number to get a slider.
 * Click on hex colors to get a color picker.
 * Flicker-free re-rendering using iFrame double buffering.

[![image](https://cloud.githubusercontent.com/assets/68416/22593539/0b50839a-ea45-11e6-8c9d-02f209b83a4a.png)](https://curran.github.io/example-viewer/#1/1/3)

# For Authors

This tool is not only for presentation, but also for creation.

 * CTRL + S will save the current example
 * CTRL + Right, then CTRL + S will create a new example

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
