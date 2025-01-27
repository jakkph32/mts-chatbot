#!/usr/bin/env node

const path = require("path");
const starter = require("./starter.js");
const destination = getDest(process.argv[2]);

function getDest(destFolder = "mts-app") {
  return path.join(process.cwd(), destFolder);
}

starter(destination);
