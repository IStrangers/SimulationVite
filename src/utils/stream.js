const { Readable } = require("stream")

async function readBody(stream) {
  if(stream instanceof Readable) {
    return new Promise((reoslve,reject) => {
      let res = ""
      stream.on("data",data => {
        res += data
      })
      stream.on("end",() => {
        reoslve(res)
      })
    })
  } else {
    return stream
  }
}

module.exports = {
  readBody,
}