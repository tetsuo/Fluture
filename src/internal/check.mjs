import {isFuture} from '../future';

import {captureApplicationContext, captureStackTrace} from './debug';
import {nil} from './list';
import {
  isAlt,
  isApply,
  isArray,
  isBifunctor,
  isChain,
  isFunction,
  isFunctor,
  isUnsigned
} from './predicates';
import {invalidArgument, invalidArity, invalidFutureArgument, withExtraContext} from './error';

function alwaysTrue(){
  return true;
}

function invalidArgumentOf(expected){
  return function(it, at, actual){
    return invalidArgument(it, at, expected, actual);
  };
}

function isFutureArray(xs){
  if(!isArray(xs)) return false;
  for(var i = 0; i < xs.length; i++){
    if(!isFuture(xs[i])) return false;
  }
  return true;
}

export var alternative = {pred: isAlt, error: invalidArgumentOf('have Alt implemented')};
export var any = {pred: alwaysTrue, error: invalidArgumentOf('be anything')};
export var apply = {pred: isApply, error: invalidArgumentOf('have Apply implemented')};
export var bifunctor = {pred: isBifunctor, error: invalidArgumentOf('have Bifunctor implemented')};
export var func = {pred: isFunction, error: invalidArgumentOf('be a Function')};
export var functor = {pred: isFunctor, error: invalidArgumentOf('have Functor implemented')};
export var future = {pred: isFuture, error: invalidFutureArgument};
export var monad = {pred: isChain, error: invalidArgumentOf('have Chain implemented')};
export var positiveInteger = {pred: isUnsigned, error: invalidArgumentOf('be a positive Integer')};

export var futureArray = {
  pred: isFutureArray,
  error: invalidArgumentOf('be an Array of valid Futures')
};

export function application(n, f, type, args, prev){
  if(args.length < 2 && type.pred(args[0])) return captureApplicationContext(prev, n, f);
  var e = args.length > 1 ? invalidArity(f, args) : type.error(f.name, n - 1, args[0]);
  captureStackTrace(e, f);
  throw withExtraContext(e, prev);
}

export function application1(f, type, args){
  return application(1, f, type, args, nil);
}
