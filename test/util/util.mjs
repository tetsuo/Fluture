import show from 'sanctuary-show';
import type from 'sanctuary-type-identifiers';
import {Future, isFuture} from '../../index.mjs';
import {AssertionError, strictEqual, deepStrictEqual} from 'assert';
export * from '../../src/internal/predicates';

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
  strictEqual(show(actual), show(expected));
  //eslint-disable-next-line no-self-compare
  if(actual !== actual && expected !== expected){
    return;
  }
  deepStrictEqual(actual, expected);
};

export var throws = function throws (f, expected){
  try{
    f();
  }catch(actual){
    eq(actual, expected);
    return;
  }
  throw new Error('Expected the function to throw');
};

export var isDeepStrictEqual = function isDeepStrictEqual (actual, expected){
  try{
    eq(actual, expected);
    return true;
  }catch(e){
    return false;
  }
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

export var assertIsFuture = function (x){
  eq(isFuture(x), true);
  eq(x instanceof Future, true);
  eq(x.constructor, Future);
  eq(isFuture(x), true);
  eq(type(x), Future['@@type']);
};

export var assertValidFuture = function (x){
  assertIsFuture(x);

  eq(typeof x.extractLeft, 'function');
  eq(x.extractLeft.length, 0);
  eq(Array.isArray(x.extractLeft()), true);

  eq(typeof x.extractRight, 'function');
  eq(x.extractRight.length, 0);
  eq(Array.isArray(x.extractRight()), true);

  eq(typeof x._transform, 'function');
  eq(x._transform.length, 1);

  eq(typeof x._interpret, 'function');
  eq(typeof x._interpret(noop, noop, noop), 'function');
  eq(x._interpret(noop, noop, noop).length, 0);
  eq(x._interpret(noop, noop, noop)(), undefined);

  return true;
};

export var assertEqual = function (a, b){
  var states = ['pending', 'crashed', 'rejected', 'resolved'];
  var astate = 0, aval;
  var bstate = 0, bval;

  assertIsFuture(a);
  assertIsFuture(b);

  a._interpret(
    function (x){
      if(astate > 0){
        throw new Error('The first Future ' + states[1] + ' while already ' + states[astate]);
      }
      astate = 1;
      aval = x;
    },
    function (x){
      if(astate > 0){
        throw new Error('The first Future ' + states[2] + ' while already ' + states[astate]);
      }
      astate = 2;
      aval = x;
    },
    function (x){
      if(astate > 0){
        throw new Error('The first Future ' + states[3] + ' while already ' + states[astate]);
      }
      astate = 3;
      aval = x;
    }
  );

  b._interpret(
    function (x){
      if(bstate > 0){
        throw new Error('The second Future ' + states[1] + ' while already ' + states[bstate]);
      }
      bstate = 1;
      bval = x;
    },
    function (x){
      if(bstate > 0){
        throw new Error('The second Future ' + states[2] + ' while already ' + states[bstate]);
      }
      bstate = 2;
      bval = x;
    },
    function (x){
      if(bstate > 0){
        throw new Error('The second Future ' + states[3] + ' while already ' + states[bstate]);
      }
      bstate = 3;
      bval = x;
    }
  );

  if(astate === 0){
    throw new Error('The first Future passed to assertEqual did not resolve instantly');
  }

  if(bstate === 0){
    throw new Error('The second Future passed to assertEqual did not resolve instantly');
  }

  if(isFuture(aval) && isFuture(bval)) return assertEqual(aval, bval);
  if(astate === bstate && isDeepStrictEqual(aval, bval)){ return true }

  throw new Error(
    '\n    ' + (a.toString()) +
    ' :: Future({ <' + states[astate] + '> ' + show(aval) + ' })' +
    '\n    does not equal:\n    ' + b.toString() +
    ' :: Future({ <' + states[bstate] + '> ' + show(bval) + ' })\n  '
  );
};

export var interpertAndGuard = function (m, rec, rej, res){
  var rejected = false, resolved = false, crashed = false;
  m._interpret(function (e){
    if(crashed){ throw new Error(m.toString() + ' crashed twice with: ' + show(e)) }
    if(rejected){ throw new Error(m.toString() + ' crashed after rejecting: ' + show(e)) }
    if(resolved){ throw new Error(m.toString() + ' crashed after resolving: ' + show(e)) }
    crashed = true;
    setTimeout(rec, 20, e);
  }, function (e){
    if(crashed){ throw new Error(m.toString() + ' rejected after crashing: ' + show(e)) }
    if(rejected){ throw new Error(m.toString() + ' rejected twice with: ' + show(e)) }
    if(resolved){ throw new Error(m.toString() + ' rejected after resolving: ' + show(e)) }
    rejected = true;
    setTimeout(rej, 20, e);
  }, function (x){
    if(crashed){ throw new Error(m.toString() + ' resolved after crashing: ' + show(x)) }
    if(rejected){ throw new Error(m.toString() + ' resolved twice with: ' + show(x)) }
    if(resolved){ throw new Error(m.toString() + ' resolved after rejecting: ' + show(x)) }
    resolved = true;
    setTimeout(res, 20, x);
  });
};

export var assertCrashed = function (m, x){
 return new Promise(function (res, rej){
  assertIsFuture(m);
  interpertAndGuard(
    m, function (e){
      if(e.message === x.message) res();
      else rej(new AssertionError({
        message: 'Expected the Future to crash with message ' + show(x.message) + '; got: ' + show(e.message)
      }));
    }, function (e){
      rej(new Error('Expected the Future to crash. Instead rejected with: ' + show(e)));
    }, function (x){
      rej(new Error('Expected the Future to crash. Instead resolved with: ' + show(x)));
    });
  });
};

export var assertRejected = function (m, x){
 return new Promise(function (res, rej){
  assertIsFuture(m);
  interpertAndGuard(
    m, function (e){
      rej(new Error('Expected the Future to reject. Instead crashed with: ' + show(e)));
    }, function (e){
      isDeepStrictEqual(x, e) ? res() : rej(new AssertionError({
        expected: x,
        actual: e,
        message: 'Expected the Future to reject with ' + show(x) + '; got: ' + show(e)
      }));
    }, function (x){
      rej(new Error('Expected the Future to reject. Instead resolved with: ' + show(x)));
    });
  });
};

export var assertResolved = function (m, x){
 return new Promise(function (res, rej){
  assertIsFuture(m);
  interpertAndGuard(
    m, function (e){
      rej(new Error('Expected the Future to resolve. Instead crashed with: ' + show(e)));
    }, function (e){
      rej(new Error('Expected the Future to resolve. Instead rejected with: ' + show(e)));
    }, function (y){
      isDeepStrictEqual(x, y) ? res() : rej(new AssertionError({
        expected: x,
        actual: y,
        message: 'Expected the Future to resolve with ' + show(x) + '; got: ' + show(y)
      }));
    });
  });
};

export var onceOrError = function (f){
  var called = false;
  return function (){
    if(called){ throw new Error('Function ' + show(f) + ' was called twice') }
    called = true;
    f.apply(null, arguments);
  };
};

export function assertStackTrace (name, x){
  eq(typeof x, 'string');
  eq(x.slice(0, name.length), name);
  var lines = x.slice(name.length).split('\n');
  eq(lines.length > 0, true);
}
