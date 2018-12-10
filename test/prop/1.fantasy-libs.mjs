import * as R from 'ramda';
import Z from 'sanctuary-type-classes';
import {Future, ap, alt, map, bimap, chain, resolve, reject} from '../../';

import {assertEqual} from '../util/util';
import {any, property, FutureArb, string, number, constant, anyFuture, oneof} from '../util/props';

function bang (x){
  return x + '!';
}

function compose (f, g){
  return function (x){
    return f(g(x));
  };
}

function square (x){
  return x * x;
}

var stringNumberFuture = FutureArb(string, number);
var stringSquareFuture = FutureArb(string, constant(square));
var make = oneof(constant(resolve), constant(reject));

describe('Prop', function (){

  property('Z.of(Future, x) = Future.of(x)', any, function (x){
    return assertEqual(Z.of(Future, x), Future.of(x));
  });

  property('R.ap(mf, mx) = ap(mf, mx)', stringSquareFuture, stringNumberFuture, function (mf, mx){
    return assertEqual(R.ap(mf, mx), ap(mf, mx));
  });

  property('Z.ap(mf, mx) = ap(mf, mx)', stringSquareFuture, stringNumberFuture, function (mf, mx){
    return assertEqual(Z.ap(mf, mx), ap(mf, mx));
  });

  property('Z.alt(a, b) = alt(a, b)', anyFuture, anyFuture, function (a, b){
    return assertEqual(Z.alt(a, b), alt(a, b));
  });

  property('R.map(f, mx) = map(f, mx)', stringNumberFuture, function (mx){
    return assertEqual(R.map(square, mx), map(square, mx));
  });

  property('Z.map(f, mx) = map(f, mx)', stringNumberFuture, function (mx){
    return assertEqual(Z.map(square, mx), map(square, mx));
  });

  property('Z.bimap(f, g, mx) = bimap(f, g, mx)', stringNumberFuture, function (mx){
    return assertEqual(Z.bimap(bang, square, mx), bimap(bang, square, mx));
  });

  property('R.chain(f, mx) = chain(f, mx)', make, stringNumberFuture, function (f, mx){
    var g = compose(f, square);
    return assertEqual(R.chain(g, mx), chain(g, mx));
  });

  property('Z.chain(f, mx) = chain(f, mx)', make, stringNumberFuture, function (f, mx){
    var g = compose(f, square);
    return assertEqual(Z.chain(g, mx), chain(g, mx));
  });

});
