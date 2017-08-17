import {Core} from './core';
import {show, showf, partial1} from './internal/fn';
import {isFunction} from './internal/is';
import {throwInvalidArgument} from './internal/throw';
import {someError} from './internal/error';

export function EncaseN(fn, a){
  this._fn = fn;
  this._a = a;
}

EncaseN.prototype = Object.create(Core);

EncaseN.prototype._interpret = function EncaseN$interpret(rec, rej, res){
  var open = true;
  try{
    this._fn(this._a, function EncaseN$done(err, val){
      if(open){
        open = false;
        err ? rej(err) : res(val);
      }
    });
  }catch(e){
    rec(someError('Future.encaseN was executing its operation', e));
  }
  return function EncaseN$cancel(){ open = false };
};

EncaseN.prototype.toString = function EncaseN$toString(){
  return 'Future.encaseN(' + showf(this._fn) + ', ' + show(this._a) + ')';
};

export function encaseN(f, x){
  if(!isFunction(f)) throwInvalidArgument('Future.encaseN', 0, 'be a function', f);
  if(arguments.length === 1) return partial1(encaseN, f);
  return new EncaseN(f, x);
}
