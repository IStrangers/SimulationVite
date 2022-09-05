const moduleReg = /^\/@modules\//
const fs = require("fs")
const { resolveVue } = require("../utils/resolveVue")

function moduleResolvePlugin(context) {
  const { app,root } = context
  const vueResolved = resolveVue(root)

  app.use(async (ctx,next) => {
    if(!moduleReg.test(ctx.path)) {
      return next()
    }
    const id = ctx.path.replace(moduleReg,"")
    ctx.type = "js"
    const content = fs.readFileSync(vueResolved[id],"utf8")
    ctx.body = content
  })
}

module.exports = {
  moduleResolvePlugin
}