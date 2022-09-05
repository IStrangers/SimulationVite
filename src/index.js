const Koa = require("koa")
const { moduleRewritePlugin } = require("./plugins/moduleRewritePlugin")
const { moduleResolvePlugin } = require("./plugins/moduleResolvePlugin")
const { serveStaticPlugin } = require("./plugins/serverPlugin")
const { htmlRewritePlugin } = require("./plugins/htmlRewritePlugin")
const { vuePlugin } = require("./plugins/vuePlugin")

function createServer() {
  const app = new Koa()
  const root = process.cwd()

  const context = {
    app,
    root,
  }

  const resolvedPlugins = [
    vuePlugin,
    htmlRewritePlugin,
    moduleRewritePlugin,
    moduleResolvePlugin,
    serveStaticPlugin,
  ]

  resolvedPlugins.forEach(plugin => plugin(context))
  return app
}

module.exports = createServer