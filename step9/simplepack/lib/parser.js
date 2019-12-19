const fs = require('fs')
const babylon = require('babylon')
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('babel-core');

module.exports = {
  // 获取 ast 树
  getAST: (path) => {
    const source = fs.readFileSync(path, 'utf-8');

    return babylon.parse(source, {
      sourceType: 'module'
    })
  },

  // 获取依赖
  getDependencies: (ast) => {
    const dependencies = [];
    traverse(ast, {
      ImportDeclaration: ({node}) => {
        dependencies.push(node.source.value)
      }
    })

    return dependencies;
  },

  // es6 => es5
  transform: (ast) => {
    const { code } = transformFromAst(ast, null, {
      presets: ['env']
    })

    return code;
  }
}
