'use strict';

const Future = require('..');

const plus1 = x => x + 1;
const repeat = (n, f, x) => Array.from({length: n}).reduce(f, x);
const Left = x => ({left: true, right: false, value: x});
const Right = x => ({left: false, right: true, value: x});

const config = {leftHeader: 'Promise', rightHeader: 'Fluture'};

const def = f => [
  {defer: true},
  (x, [d]) => f(x).then(() => d.resolve()),
  (x, [d]) => f(x).value(() => d.resolve())
];

const PromiseInterop = {
  of: x => Promise.resolve(x),
  map: (f, p) => p.then(f),
  chain: (f, p) => p.then(f),
  fold: (f, g, p) => p.then(g, f),
  race: (a, b) => Promise.race([a, b]),
  after: (n, x) => new Promise(res => setTimeout(res, n, x))
};

module.exports = require('sanctuary-benchmark')(PromiseInterop, Future, config, {

  'of': def(
    ({of}) => repeat(1000, of, 1)
  ),

  'after': def(
    ({after}) => after(10, 1),
  ),

  'map': def(
    ({map, of}) => repeat(1000, m => map(plus1, m), of(1))
  ),

  'fold': def(
    ({fold, of}) => repeat(1000, m => fold(Left, Right, m), of(1))
  ),

  'chain.sync': def(
    ({chain, of}) => repeat(1000, m => chain(x => of(plus1(x)), m), of(1))
  ),

  'chain.async': def(
    ({chain, after}) => repeat(5, m => chain(x => after(1, plus1(x)), m), after(1, 1))
  ),

  'race.sync': def(
    ({race, of}) => repeat(1000, m => race(m, of(2)), of(1))
  ),

  'race.async': def(
    ({race, after}) => repeat(5, m => race(m, after(1, 2)), after(1, 1))
  ),

});
