import type from 'sanctuary-type-identifiers';
import show from 'sanctuary-show';
import jsc from 'jsverify';

import {resolve, reject, Par, seq} from '../../';
import {eq, error, throws} from '../util/util';
import {ordinal} from '../../src/internal/const';

export var array = jsc.array;
export var nearray = jsc.nearray;
export var bool = jsc.bool;
export var _k = jsc.constant;
export var falsy = jsc.falsy;
export var fn = jsc.fn;
export var letrec = jsc.letrec;
export var nat = jsc.nat;
export var number = jsc.number;
export var oneof = jsc.oneof;
export var string = jsc.string;
export var property = jsc.property;

var R_VOWEL = /^[aeiouyAEIOUY]/;

export function ResolvedFutureArb (arb){
  return arb.smap(resolve, function (m){
    var x;
    m.fork(function (){ throw error }, function (y){ x = y });
    return x;
  }, show);
}

export function RejectedFutureArb (arb){
  return arb.smap(reject, function (m){
    var x;
    m.fork(function (y){ x = y }, function (){ throw error });
    return x;
  }, show);
}

export function FutureArb (larb, rarb){
  return oneof(RejectedFutureArb(larb), ResolvedFutureArb(rarb));
}

export function _of (rarb){
  return FutureArb(string, rarb);
}

export function an (thing){
  return R_VOWEL.test(thing) ? ('an ' + thing) : ('a ' + thing);
}

export var {
  any,
  anyFuture,
  anyRejectedFuture,
  anyResolvedFuture,
  anyNonFuture,
  anyFunction,
} = letrec(function (tie){
  return {
    anyRejectedFuture: RejectedFutureArb(tie('any')),
    anyResolvedFuture: ResolvedFutureArb(tie('any')),
    anyFuture: oneof(tie('anyRejectedFuture'), tie('anyResolvedFuture')),
    anyFunction: fn(tie('any')),
    anyNonFuture: oneof(
      number,
      string,
      bool,
      falsy,
      _k(error),
      tie('anyFunction')
    ),
    any: oneof(
      tie('anyNonFuture'),
      tie('anyFuture')
    )
  };
});

export var anyParallel = anyFuture.smap(Par, seq, show);

export var altArg = {
  name: 'Alt',
  valid: anyFuture,
  invalid: anyNonFuture,
};

export var applyArg = {
  name: 'Apply',
  valid: anyFuture,
  invalid: anyNonFuture,
};

export var bifunctorArg = {
  name: 'Bifunctor',
  valid: anyFuture,
  invalid: anyNonFuture,
};

export var chainArg = {
  name: 'Chain',
  valid: anyFuture,
  invalid: anyNonFuture,
};

export var functorArg = {
  name: 'Functor',
  valid: anyFuture,
  invalid: anyNonFuture,
};

export var functionArg = {
  name: 'Function',
  valid: anyFunction,
  invalid: oneof(number, string, bool, falsy, _k(error)),
};

export var futureArg = {
  name: 'valid Future',
  valid: anyFuture,
  invalid: anyNonFuture,
};

export var resolvedFutureArg = {
  name: 'valid Future',
  valid: anyResolvedFuture,
  invalid: anyNonFuture,
};

export var positiveIntegerArg = {
  name: 'positive Integer',
  valid: jsc.suchthat(nat, function (x){ return x > 0 }),
  invalid: oneof(_k(NaN), bool, _k(0.5)),
};

export var futureArrayArg = {
  name: 'Array of valid Futures',
  valid: array(anyFuture),
  invalid: oneof(nearray(anyNonFuture), any),
};

export var parallelArg = {
  name: 'ConcurrentFuture',
  valid: anyParallel,
  invalid: any,
};

export var anyArg = {
  name: 'Any',
  valid: any,
  invalid: null,
};

var getValid = function (x){ return x.valid };
var generateValid = function (x){ return getValid(x).generator(1) };

var capply = function (f, args){
  return args.reduce(function (g, x){ return g(x) }, f);
};

export function testFunction (name, func, args, assert){
  var validArbs = args.map(getValid);
  var validArgs = args.map(generateValid);

  it('is a curried ' + args.length + '-ary function', function (){
    eq(typeof func, 'function');
    eq(func.length, args.length);
    validArgs.slice(0, -1).forEach(function (_, idx){
      var partial1 = func.apply(null, validArgs.slice(0, idx + 1));
      var partial2 = capply(func, validArgs.slice(0, idx + 1));
      eq(typeof partial1, 'function');
      eq(typeof partial2, 'function');
    });
  });

  args.forEach(function (arg, idx){
    var priorArgs = args.slice(0, idx);
    var followingArgs = args.slice(idx + 1);
    var validPriorArgs = priorArgs.map(generateValid);
    var validFollowingArgs = followingArgs.map(generateValid);
    if(arg !== anyArg){
      property('throws when the ' + ordinal[idx] + ' argument is invalid', arg.invalid, function (value){
        throws(function (){
          func.apply(null, validPriorArgs.concat([value]).concat(validFollowingArgs));
        }, new TypeError(
          name + '() expects its ' + ordinal[idx] + ' argument to be ' + an(arg.name) + '.\n' +
          '  Actual: ' + show(value) + ' :: ' + type.parse(type(value)).name
        ));
        return true;
      });
    }
  });

  property.apply(null, ['returns valid output when given valid input'].concat(validArbs).concat([function (){
    return assert(func.apply(null, arguments));
  }]));
}

export function testMethod (instance, method, args){
  var validArgs = args.map(generateValid);

  it('exists', function (){
    eq(typeof instance[method], 'function');
    eq(instance[method].length, args.length);
  });

  property('throws when invoked out of context', anyNonFuture, function (value){
    throws(function (){ instance[method].apply(value, validArgs) }, new TypeError(
      'Future#' + method + '() was invoked outside the context of a Future. ' +
      'You might want to use a dispatcher instead\n' +
      '  Called on: ' + show(value)
    ));
    return true;
  });

  args.forEach(function (arg, idx){
    var priorArgs = args.slice(0, idx);
    var followingArgs = args.slice(idx + 1);
    var validPriorArgs = priorArgs.map(generateValid);
    var validFollowingArgs = followingArgs.map(generateValid);
    property('throws when the ' + ordinal[idx] + ' argument is invalid', arg.invalid, function (value){
      throws(function (){
        instance[method].apply(instance, validPriorArgs.concat([value]).concat(validFollowingArgs));
      }, new TypeError(
        'Future#' + method + '() expects its ' + ordinal[idx] + ' argument to be ' + an(arg.name) + '.\n' +
        '  Actual: ' + show(value) + ' :: ' + type.parse(type(value)).name
      ));
      return true;
    });
  });
}
