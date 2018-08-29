var pkg = require('./package.json');

var dependencies = {
  'concurrify': 'concurrify',
  'denque': 'Denque',
  'sanctuary-show': 'sanctuaryShow',
  'sanctuary-type-identifiers': 'sanctuaryTypeIdentifiers'
};

export default {
  input: 'index.cjs.mjs',
  external: Object.keys(dependencies),
  output: {
    format: 'umd',
    file: pkg.main + '.js',
    name: 'Fluture',
    globals: dependencies
  }
};
