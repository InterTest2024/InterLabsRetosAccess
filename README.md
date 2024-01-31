# Inter Labs Web Test

This is meant to be a low maintenence, deployable page to test all builds for Inter Labs.

# Adding Removing Classes

To **add** a class just make a WebGL build directed to here, and name it`[Course+Number]-[ClassName]`, ie `BIOL3045-Something Something`.

Please note that you **require** a Course name, followed by a dash, as the generator looks up the string before said dash, to add it to the correct course group.

To **remove** a class just delete the build folder.

Once you make these changes, run the Index Generator. Though you will only need to run the generator if you have a newly added course or class. Re-Building an existing Class does not require the page regeneration

# Running the Index Generator

To run the page generator, you'll need [NodeJS](https://nodejs.org/en/), and run either `npm i` or `yarn` once in this directory to install dependencies (Pug).

Once you have all your builds set, and have installed dependencies, you can run the generator.
`node ./GenerateIndex.js`
