# ToDo List | The Odin Project

This is the repo for the ToDo List project in the JavaScript course of The Odin Project

## Project

A standard of most JavaSciprt courses, the objective of the project is to create a to-do list app.  The app needs to be able to create, update, and delete items on the list as well as have the ability to create multiple lists.

## What I Learned

### Object-Oriented Programming

I had some more practice with object-oriented programming (OOP) and working with factory functions to create such objects.  I'm starting to get a better feel of how organized OOP can be.  With the use of factory functions, I can keep object data privately scoped within the object and only allow access through methods that return the data.  The code looks like a jumble since the to-do item objects are nested within the list objects, but everything appears to be referencing correctly.

### html-webpack-plugin

With the Webpack tutorials, the `index.html` file was stored and modified within our `/dist` folder.  This didn't make a whole lot of sense to me because the `/dist` folder is intended as the output for the bundle.  This was a sore spot for me when I started putting together my first Git commit and was taught not to commit anything that is outputted by something i.e. we should only commit source files that are needed to generate the production files.  I wanted to have my so-called template HTML file in my `/src` folder that is to be passed through the bundler out to the other side in the `/dist` folder.

I found an article on [bundling HTML](https://www.learnhowtoprogram.com/user-interfaces/responsive-design-development-environments/bundling-html) and it stepped through how to pass a template `index.html` file through Webpack using the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin).  Now my sore spot is gone and anyone wanting to run the bundler on their own machine has the source code through the Git repo and can output the `index.html` file along with the other files into the `/dist` folder as expected.