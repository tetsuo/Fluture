import {invalidFuture} from './error';
import {nil} from './list';
import {noop, moop, show} from './utils';

import {crash} from '../crash';
import {isFuture} from '../future';
import {reject} from '../reject';
import {resolve} from '../resolve';

function BaseTransformation$rejected(x){
  this.cancel();
  return reject(x);
}

function BaseTransformation$resolved(x){
  this.cancel();
  return resolve(x);
}

export var BaseTransformation = {
  rejected: BaseTransformation$rejected,
  resolved: BaseTransformation$resolved,
  run: moop,
  cancel: noop,
  context: nil,
  arity: 0,
  name: 'transform'
};

function wrapHandler(handler){
  return function transformationHandler(x){
    var m;
    try{
      m = handler.call(this, x);
    }catch(e){
      return crash(e);
    }
    if(isFuture(m)){
      return m;
    }
    return crash(invalidFuture(
      this.name + ' expects the return value from the function it\'s given', m,
      '\n  When called with: ' + show(x)
    ));
  };
}

export function createTransformation(arity, name, prototype){
  var Transformation = function(context){
    this.context = context;
    for(var i = 1; i <= arity; i++) this['$' + String(i)] = arguments[i];
  };

  Transformation.prototype = Object.create(BaseTransformation);
  Transformation.prototype.arity = arity;
  Transformation.prototype.name = name;

  if(typeof prototype.rejected === 'function'){
    Transformation.prototype.rejected = wrapHandler(prototype.rejected);
  }

  if(typeof prototype.resolved === 'function'){
    Transformation.prototype.resolved = wrapHandler(prototype.resolved);
  }

  if(typeof prototype.run === 'function'){
    Transformation.prototype.run = prototype.run;
  }

  return Transformation;
}
