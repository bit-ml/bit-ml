# Bitdefender ML & Crypto Research Website


## Content editing

You can edit the content of the site such as the bios and project descriptions
in `/src/data/*.json`.


## Install the project

This project is built with
[react-static](https://github.com/nozzle/react-static "react-static - a progressive static site generator for React").
You might want to check their [tutorial](https://react-static.js.org/docs/concepts) first.

- Make sure you have `node v10.24.0` installed. You can manage `node` and `npm`
  versions with [nvm](https://github.com/creationix/nvm "Node Version Manager")
- Install `react-static` globally with `npm install -g react-static@5.9.12`.
- Install the node modules with `npm install`.
- Start a local server with the project with `npm start`.
- Generate the static website with `npm run-script build`.
- Copy resources to bit-ml.github.io project `rm -rf bit-ml.github.io/*; cp -r bit-ml/dist/* bit-ml.github.io/`
- **TEST** changes: `cd bit-ml.github.io/; python -m http.server 8000`
- Commit in both repos: *bit-ml* and *bit-ml.github.io*
