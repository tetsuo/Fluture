import Future from '../../index.mjs';
import {assertEqual as eq, B, noop, STACKSIZE} from '../util/util';
import {property, number} from '../util/props';

var of = Future.of;
var ap = Future.ap;
var alt = Future.alt;
var map = Future.map;
var bimap = Future.bimap;
var chain = Future.chain;
var chainRec = Future.chainRec;

var I = function (x){ return x };
var T = function (x){ return function (f){ return f(x) } };

var sub3 = function (x){ return x - 3 };
var mul3 = function (x){ return x * 3 };

var test = function (name, f){
  return property(name, number, f);
};

describe('Static Land', function (){

  this.slow(200);
  this.timeout(5000);

  describe('Functor', function (){
    test('identity', function (x){
      return eq(map(I, of(x)), of(x));
    });
    test('composition', function (x){
      return eq(map(B(sub3)(mul3), of(x)), map(sub3, map(mul3, of(x))));
    });
  });

  describe('Alt', function (){
    test('associativity', function (x){
      var a = of(x);
      var b = of(sub3(x));
      var c = of(mul3(x));
      return eq(alt(alt(a, b), c), alt(a, alt(b, c)));
    });
    test('composition', function (x){
      var a = of(x);
      var b = of(sub3(x));
      return eq(map(mul3, alt(a, b)), alt(map(mul3, a), map(mul3, b)));
    });
  });

  describe('Bifunctor', function (){
    test('identity', function (x){
      return eq(bimap(I, I, of(x)), of(x));
    });
    test('composition', function (x){
      return eq(
        bimap(B(sub3)(mul3), B(sub3)(mul3), of(x)),
        bimap(sub3, sub3, bimap(mul3, mul3, of(x)))
      );
    });
  });

  describe('Apply', function (){
    test('composition', function (x){
      return eq(
        ap(ap(map(B, of(sub3)), of(mul3)), of(x)),
        ap(of(sub3), ap(of(mul3), of(x)))
      );
    });
  });

  describe('Applicative', function (){
    test('identity', function (x){
      return eq(ap(of(I), of(x)), of(x));
    });
    test('homomorphism', function (x){
      return eq(ap(of(sub3), of(x)), of(sub3(x)));
    });
    test('interchange', function (x){
      return eq(ap(of(sub3), of(x)), ap(of(T(x)), of(sub3)));
    });
  });

  describe('Chain', function (){
    test('associativity', function (x){
      return eq(
        chain(B(of)(sub3), chain(B(of)(mul3), of(x))),
        chain(function (y){ return chain(B(of)(sub3), B(of)(mul3)(y)) }, of(x))
      );
    });
  });

  describe('ChainRec', function (){
    test('equivalence', function (x){
      var p = function (v){ return v < 1 };
      var d = of;
      var n = B(of)(function (v){ return v - 1 });
      var a = chainRec(function (l, r, v){ return p(v) ? map(r, d(v)) : map(l, n(v)) }, x);
      var b = (function step (v){ return p(v) ? d(v) : chain(step, n(v)) }(x));
      return eq(a, b);
    });
    it('stack-safety', function (){
      var p = function (v){ return v > (STACKSIZE + 1) };
      var d = of;
      var n = B(of)(function (v){ return v + 1 });
      var a = chainRec(function (l, r, v){ return p(v) ? map(r, d(v)) : map(l, n(v)) }, 0);
      a._interpret(noop, noop, noop);
    });
  });

  describe('Monad', function (){
    test('left identity', function (x){
      return eq(chain(B(of)(sub3), of(x)), B(of)(sub3)(x));
    });
    test('right identity', function (x){
      return eq(chain(of, of(x)), of(x));
    });
  });

});
