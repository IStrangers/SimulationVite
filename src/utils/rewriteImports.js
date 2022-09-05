const { parse } = require("es-module-lexer")
const MagicString = require("magic-string")

function rewriteImports(content) {
  const [imports] = parse(content)
  if(!imports.length || imports.length <= 0) {
    return content
  }
  let magicString = new MagicString(content)
  for(let i = 0; i < imports.length; i++) {
    const { s,e } = imports[i]
    const id = content.substring(s,e)
    if(/^[^\/\.]/.test(id)) {
      magicString.overwrite(s,e,`/@modules/${id}`)
    }
  }
  return magicString.toString()
}

module.exports = {
  rewriteImports
}