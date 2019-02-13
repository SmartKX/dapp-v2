Welcome to my JavaScript Application Loader and Bundler

Introduction
============

The purpose of this package is to create an global application instance and bundle the code into a single js file.

This can then be deployed in both server and client side environments, with no reliance on specific module loading patterns or libraries.

The app container format means that modules can simply reference each other, as opposed to importing them via relative paths.

Files and Folders
=================

The applicator loader 'app-loader', comes with the default files and folder structure...

```
./dist <-- build target
./src
  - ./js
    - ./modules <-- for storing your modules
        - ./index.js <-- for loading all module groups
        - ./factory
            - ./index.js <-- for loading all factory modules
            - ./lib.js <-- our module, 'factory/lib'
        - ./service
            - ./index.js
              ./state.js
    - ./app.js  <-- to create the app-loader instance
    - ./main.js <-- used by rollup as the application entry point
./
  - build.sh  <-- for creating your build target rollup iife
  - loader.js <-- app loader library
  - README.md
  - sync.sh   <-- used to upload your code to the server 
```

Getting started
===============

To define a module, create your js file as follows: -

```
app.module('<group>/<name>', function() {

    class MyModule {

    }

    return MyModule

})
```

group - used to describe the 'category' of the module, i.e. factory, service, model, view etc.

name - this describes the purpose of the module, i.e. lib, http etc.


Note
----

If you have a module group is called 'service', all modules will be created 'once' and the same instance is retrieved on request.

This allows you to store / share 'state' throughout your application, i.e. shared data, an events service or a database connection manager etc.

All other modules will operate as a factory function, i.e. every time they are referenced, you get a new export of that module.


Examples...

```
// declare a 'factory' function called 'api'...

create ./src/modules/factory/api.js
create ./src/modules/factory/index.js <-- used as entry point for loading all group modules

app.module('factory/api', function() {

    class Api {

        static GET() {

        }

    }

    return Api

})
```

```
// declare a new 'model' called 'Book'...

create ./src/modules/model/book.js
create ./src/modules//index.js <-- used as entry point for loading all group modules

app.module('model/Book', function({ factory }) { // this allows us to access the 'factory' group...

    var { api } = factory // and now we can uses the 'api' module from 'factory'

    class Book {

    }

    return Book

})
```

Building
========

You can use the ./build.sh script to build you target folder, rollup iife file and load any other files required for your application

If you haven't already, please install the rollup utility, as per their instructions...

```
npm install -g rollup
```

Please edit the 'build.sh' as per your requirements.

The default creates a build target 'server/build' and writes the rollup output to 'server/build/main.js' via './build.js source'

To copy any extra files, you can run './build.js files'

You can combined 'source' and 'files' using './build.js all'

Syncing to the server
=====================

Should you wish to deploy your above build target to a server, I've also included a './sync.sh', but you will need to edit this as per your requirements.


Caveats
=======

Circular dependancies - don't do them... :)

Not detected at the moment, so you'll see a friendly...

```
RangeError: Maximum call stack size exceeded
```