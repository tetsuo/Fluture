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
    file: 'cjs.js',
    name: 'Fluture',
    globals: dependencies
  }
};
