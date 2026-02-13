

# SimulationVite

## 介绍

SimulationVite 是一个 Vite 构建工具的模拟实现项目。Vite 是由 Vue.js 作者尤雨溪开发的新一代前端构建工具，以其极速的热更新（HMR）和开发体验著称。本项目旨在通过手动实现 Vite 的核心功能，帮助开发者理解 Vite 的工作原理和架构设计。

## 软件架构

SimulationVite 采用插件化的架构设计，核心组件包括：

### 核心模块
- **bin/vite.js** - 命令行入口，负责启动开发服务器
- **src/index.js** - 主入口，集成所有插件并协调工作

### 插件系统
- **htmlRewritePlugin** - 处理 HTML 文件的重写，支持入口文件解析
- **moduleResolvePlugin** - 模块解析器，负责查找和定位第三方模块
- **moduleRewritePlugin** - 导入重写器，将 ESM 导入转换为浏览器可识别的格式
- **serveStaticPlugin** - 静态资源服务器，提供文件访问服务
- **vuePlugin** - Vue 专用插件，处理 .vue 单文件组件

### 工具函数
- **resolveVue** - Vue 框架解析工具
- **rewriteImports** - import 语句解析与重写
- **readBody** - 请求体读取工具

## 技术栈

- **Node.js** - 运行环境
- **Koa** - Web 服务器框架
- **ES Module** - 模块系统
- **MagicString** - 高效字符串操作库

## 安装教程

```bash
# 使用 pnpm 安装依赖
pnpm install

# 进入测试项目目录
cd test

# 安装测试项目依赖
pnpm install
```

## 使用说明

### 启动开发服务器

在项目根目录执行：

```bash
node bin/vite.js
```

### 启动测试项目

在 test 目录下：

```bash
# 开发模式
cd test
pnpm dev

# 或使用 SimulationVite
cd test
node ../bin/vite.js
```

### 测试验证

1. 访问 `http://localhost:3000`
2. 验证 Vue 3 应用是否正常加载
3. 检查热更新功能是否正常工作

## 项目结构

```
SimulationVite/
├── bin/
│   └── vite.js          # CLI 入口
├── src/
│   ├── index.js         # 主入口
│   ├── plugins/         # 插件目录
│   │   ├── htmlRewritePlugin.js
│   │   ├── moduleResolvePlugin.js
│   │   ├── moduleRewritePlugin.js
│   │   ├── serveStaticPlugin.js
│   │   └── vuePlugin.js
│   └── utils/           # 工具函数
│       ├── resolveVue.js
│       ├── rewriteImports.js
│       └── stream.js
├── test/                # 测试项目
│   ├── src/            # Vue 组件源码
│   ├── public/         # 静态资源
│   ├── index.html      # 入口 HTML
│   └── vite.config.js  # Vite 配置
├── package.json
└── README.md
```

## 工作原理

1. **请求拦截** - Koa 服务器拦截浏览器请求
2. **入口解析** - 解析 index.html 获取入口文件
3. **模块重写** - 将 ESM 的 import 语句转换为服务器路径
4. **依赖解析** - 递归解析所有模块依赖
5. **返回结果** - 将处理后的代码返回给浏览器

## 参与贡献

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

## 学习资源

- [Vite 官方文档](https://vitejs.dev/)
- [Vue 3 官方文档](https://vuejs.org/)
- [Koa 框架文档](https://koajs.com/)

## License

本项目遵循开源协议，具体信息请参阅 LICENSE 文件。