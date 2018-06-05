import {expect} from 'chai';
import {Future, isFuture} from '../index.mjs.js';
import Z from 'sanctuary-type-classes';
import {AssertionError, strictEqual} from 'assert';

export var STACKSIZE = (function r (){try{return 1 + r()}catch(e){return 1}}());
export var noop = function (){};
export var add = function (a){ return function (b){ return a + b } };
export var sub = function (a){ return function (b){ return a - b } };
export var bang = function (s){ return (s + '!') };
export var I = function (x){ return x };
export var B = function (f){ return function (g){ return function (x){ return f(g(x)) } } };
export var error = new Error('Intentional error for unit testing');
export var throwit = function (it){ throw it };

export var eq = function eq (actual, expected){
  strictEqual(arguments.length, eq.length);
  strictEqual(Z.toString(actual), Z.toString(expected));
  strictEqual(Z.equals(actual, expected), true);
};

export var repeat = function (n, x){
  var out = new Array(n);
  while(n-- > 0){ out[n] = x } //eslint-disable-line
  return out;
};

export var failRes = function (x){
  throw new Error(('Invalidly entered resolution branch with value ' + x));
};

export var failRej = function (x){
  throw new Error(('Invalidly entered rejection branch with value ' + x));
};

export var assertIsFuture = function (x){ return expect(x).to.be.an.instanceof(Future) };

export var assertEqual = function (a, b){
  var states = ['pending', 'rejected', 'resolved'];
  if(!(a instanceof Future && b instanceof Future)){ throw new Error('Both values must be Futures') }
  var astate = 0, aval;
  var bstate = 0, bval;
  a._interpret(throwit, function (x){astate = 1; aval = x}, function (x){astate = 2; aval = x});
  b._interpret(throwit, function (x){bstate = 1; bval = x}, function (x){bstate = 2; bval = x});
  if(astate === 0){ throw new Error('First Future passed to assertEqual did not resolve instantly') }
  if(bstate === 0){ throw new Error('Second Future passed to assertEqual did not resolve instantly') }
  if(isFuture(aval) && isFuture(bval)) return assertEqual(aval, bval);
  if(astate === bstate && Z.equals(aval, bval)){ return true }
  throw new Error(
    '\n    ' + (a.toString()) +
    ' :: Future({ <' + states[astate] + '> ' + Z.toString(aval) + ' })' +
    '\n    does not equal:\n    ' + b.toString() +
    ' :: Future({ <' + states[bstate] + '> ' + Z.toString(bval) + ' })\n  '
  );
};

export var interpertAndGuard = function (m, rec, rej, res){
  var rejected = false, resolved = false, crashed = false;
  m._interpret(function (e){
    if(crashed){ throw new Error(m.toString() + ' crashed twice with: ' + Z.toString(e)) }
    if(rejected){ throw new Error(m.toString() + ' crashed after rejecting: ' + Z.toString(e)) }
    if(resolved){ throw new Error(m.toString() + ' crashed after resolving: ' + Z.toString(e)) }
    crashed = true;
    rec(e);
  }, function (e){
    if(crashed){ throw new Error(m.toString() + ' rejected after crashing: ' + Z.toString(e)) }
    if(rejected){ throw new Error(m.toString() + ' rejected twice with: ' + Z.toString(e)) }
    if(resolved){ throw new Error(m.toString() + ' rejected after resolving: ' + Z.toString(e)) }
    rejected = true;
    rej(e);
  }, function (x){
    if(crashed){ throw new Error(m.toString() + ' resolved after crashing: ' + Z.toString(x)) }
    if(rejected){ throw new Error(m.toString() + ' resolved twice with: ' + Z.toString(x)) }
    if(resolved){ throw new Error(m.toString() + ' resolved after rejecting: ' + Z.toString(x)) }
    resolved = true;
    res(x);
  });
};

export var assertCrashed = function (m, x){
 return new Promise(function (res, rej){
  assertIsFuture(m);
  interpertAndGuard(
    m, function (e){
      Z.equals(x, e) ? res() : rej(new AssertionError({
        expected: x,
        actual: e,
        message: 'Expected the Future to crash with ' + Z.toString(x) + '; got: ' + Z.toString(e)
      }));
    }, function (e){
      rej(new Error('Expected the Future to crash. Instead rejected with: ' + Z.toString(e)));
    }, function (x){
      rej(new Error('Expected the Future to crash. Instead resolved with: ' + Z.toString(x)));
    });
  });
};

export var assertRejected = function (m, x){
 return new Promise(function (res, rej){
  assertIsFuture(m);
  interpertAndGuard(
    m, function (e){
      rej(new Error('Expected the Future to reject. Instead crashed with: ' + Z.toString(e)));
    }, function (e){
      Z.equals(x, e) ? res() : rej(new AssertionError({
        expected: x,
        actual: e,
        message: 'Expected the Future to reject with ' + Z.toString(x) + '; got: ' + Z.toString(e)
      }));
    }, function (x){
      rej(new Error('Expected the Future to reject. Instead resolved with: ' + Z.toString(x)));
    });
  });
};

export var assertResolved = function (m, x){
 return new Promise(function (res, rej){
  assertIsFuture(m);
  interpertAndGuard(
    m, function (e){
      rej(new Error('Expected the Future to resolve. Instead crashed with: ' + Z.toString(e)));
    }, function (e){
      rej(new Error('Expected the Future to resolve. Instead rejected with: ' + Z.toString(e)));
    }, function (y){
      Z.equals(x, y) ? res() : rej(new AssertionError({
        expected: x,
        actual: y,
        message: 'Expected the Future to resolve with ' + Z.toString(x) + '; got: ' + Z.toString(y)
      }));
    });
  });
};

export var onceOrError = function (f){
  var called = false;
  return function (){
    if(called){ throw new Error('Function ' + Z.toString(f) + ' was called twice') }
    called = true;
    f.apply(null, arguments);
  };
};
