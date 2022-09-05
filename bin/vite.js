#! /usr/bin/env node

const createServer = require("../src/index")

createServer().listen(4000,() => {
  console.log(`server start:`,`http://localhost:4000`)
})