const { getAST, getDependencies, transform } = require('./parser');
const path = require('path');
const fs = require('fs')

module.exports = class Compiler {
  constructor(options) {
    const { entry, output } = options;

    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run () {
    const entryModule = this.buildMoudle(this.entry, true);

    this.modules.push(entryModule);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(this.buildMoudle(dependency))
      })
    })

    // console.log(this.modules)
    // console.log(JSON.stringify(this.modules, null, '  '));
    this.emitFiles();
  }

  buildMoudle (filename, isEntry) {
    let ast;

    if (isEntry) {
      ast = getAST(filename)
    } else {
      const absolutePath = path.join(process.cwd(), './src', filename)
      ast = getAST(absolutePath)
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      source: transform(ast)
    }
  }

  emitFiles() {
    console.log(this.output)
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';
    this.modules.map((_module) => {
      modules += `'${_module.filename}': function(require, module, exports) { ${_module.source} },`
    })

    const bundle = `(function(modules) {
      function require(filename) {
        var fn = modules[filename];
        var module = { exports: {} };

        fn(require, module, module.exports)

        return module.exports;
      }

      require('${ this.entry }')
    })({${ modules }})`;

    // console.log('bundle', bundle)

    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
}
