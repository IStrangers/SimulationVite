const path = require("path")
const fs = require("fs")
const { resolveVue } = require("../utils/resolveVue")
const { rewriteImports } = require("../utils/rewriteImports")
const defaultExportReg = /((?:^|\n|;)\s*)export default/

function vuePlugin(context) {
  const { app,root } = context

  app.use(async (ctx,next) => {
    if(!ctx.path.endsWith(".vue")) {
      return next()
    }
    const filePath = path.posix.join(root,ctx.path)
    const content = fs.readFileSync(filePath,"utf8")
    const { parse,compileTemplate } = require(resolveVue(root).compiler)
    const { descriptor } = parse(content)
    if(!ctx.query.type) {
      let code = ""
      if(descriptor.script) {
        const content = descriptor.script.content
        const replaced = content.replace(defaultExportReg,`$1const __script =`)
        code += replaced
      }
      if(descriptor.template) {
        const templateRequest = ctx.path + "?type=template"
        code += `\nimport { render as __render } from ${JSON.stringify(templateRequest)}`
        code += `\n__script.render = __render`
      }
      ctx.type = "js"
      code += `\nexport default __script`
      ctx.body = rewriteImports(code)
    }else if(ctx.query.type === "template") {
      ctx.type = "js"
      const { code } = compileTemplate({ source: descriptor.template.content })
      ctx.body = rewriteImports(code)
    }
  })
}

module.exports = {
  vuePlugin
}