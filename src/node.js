import {Core} from './core';
import {showf} from './internal/fn';
import {isFunction} from './internal/is';
import {throwInvalidArgument} from './internal/throw';
import {someError} from './internal/error';

export function Node(fn){
  this._fn = fn;
}

Node.prototype = Object.create(Core);

Node.prototype._interpret = function Node$interpret(rec, rej, res){
  var open = true;
  try{
    this._fn(function Node$done(err, val){
      if(open){
        open = false;
        err ? rej(err) : res(val);
      }
    });
  }catch(e){
    rec(someError('Future.node was executing its operation', e));
  }
  return function Node$cancel(){ open = false };
};

Node.prototype.toString = function Node$toString(){
  return 'Future.node(' + showf(this._fn) + ')';
};

export function node(f){
  if(!isFunction(f)) throwInvalidArgument('Future.node', 0, 'be a function', f);
  return new Node(f);
}
