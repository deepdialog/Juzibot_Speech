#!/bin/bash

mkdir -p docs
./node_modules/.bin/jsdoc2md src/*.js > docs/README.md
./node_modules/.bin/jsdoc2md src/actions/*.js > docs/ACTIONS.md
./node_modules/.bin/jsdoc2md src/components/**/*.js > docs/COMPONENTS.md
./node_modules/.bin/jsdoc2md src/backend/*.js > docs/BACKEND.md
