const path = require("path")

function resolveVue(root) {
  const compilerPkgPath = path.posix.join(root,"node_modules","@vue","compiler-sfc","package.json")
  const compilerPkg = require(compilerPkgPath)
  const compilerPath = path.posix.join(path.posix.dirname(compilerPkgPath),compilerPkg.main)
  const resolvePath = (name) => {
    const pathUrl = path.posix.join(root,"node_modules","@vue",name,"dist",`${name}.esm-bundler.js`)
    return pathUrl
  }
  const runtimeDomPath = resolvePath("runtime-dom")
  const runtimeCorePath = resolvePath("runtime-core")
  const reactivityPath = resolvePath("reactivity")
  const sharedPath = resolvePath("shared")
  return {
    compiler: compilerPath,
    vue: runtimeDomPath,
    "@vue/runtime-dom": runtimeDomPath,
    "@vue/runtime-core": runtimeCorePath,
    "@vue/reactivity": reactivityPath,
    "@vue/shared": sharedPath,
  }
}

module.exports = {
  resolveVue
}