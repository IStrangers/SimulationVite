const { rewriteImports } = require("../utils/rewriteImports")
const { readBody } = require("../utils/stream")


function moduleRewritePlugin(context) {
  const { app,root } = context
  app.use(async (ctx,next) => {
    await next()

    if(ctx.body && ctx.response.is("js")) {
      let content = await readBody(ctx.body)
      const result = rewriteImports(content)
      ctx.body = result
    }
  })
}

module.exports = {
  moduleRewritePlugin
}