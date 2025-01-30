#!/usr/bin/env node

const { join } = require("path");
const starter =require("./starter.js")
const destination = getDest(process.argv[2]);

function getDest(destFolder = "mts-app") {
  return join(process.cwd(), destFolder);
}

starter(destination);
