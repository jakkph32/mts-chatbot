#!/usr/bin/env node

import { join } from "path";
import starter from "./starter.js";
const destination = getDest(process.argv[2]);

function getDest(destFolder = "mts-app") {
  return join(process.cwd(), destFolder);
}

starter(destination);
