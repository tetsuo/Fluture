import {show, showf, noop, moop, raise} from './internal/utils';
import {isFunction} from './internal/predicates';
import {FL, $$type} from './internal/const';
import interpret from './internal/interpreter';
import {nil, cons} from './internal/list';
import type from 'sanctuary-type-identifiers';
import {error, typeError, invalidFuture, valueToError} from './internal/error';
import {throwInvalidArgument, throwInvalidContext, throwInvalidFuture} from './internal/throw';

function Future$onCrash(x){
  raise(valueToError(x));
}

export function Future(computation){
  if(!isFunction(computation)) throwInvalidArgument('Future', 0, 'be a Function', computation);
  return new Computation(computation);
}

export function isFuture(x){
  return x instanceof Future || type(x) === $$type;
}

Future['@@type'] = $$type;

Future.prototype['@@show'] = function Future$show(){
  return this.toString();
};

Future.prototype[FL.ap] = function Future$FL$ap(other){
  return other._ap(this);
};

Future.prototype[FL.map] = function Future$FL$map(mapper){
  return this._map(mapper);
};

Future.prototype[FL.bimap] = function Future$FL$bimap(lmapper, rmapper){
  return this._bimap(lmapper, rmapper);
};

Future.prototype[FL.chain] = function Future$FL$chain(mapper){
  return this._chain(mapper);
};

Future.prototype.fork = function Future$fork(rej, res){
  if(!isFuture(this)) throwInvalidContext('Future#fork', this);
  if(!isFunction(rej)) throwInvalidArgument('Future#fork', 0, 'to be a Function', rej);
  if(!isFunction(res)) throwInvalidArgument('Future#fork', 1, 'to be a Function', res);
  return this._interpret(Future$onCrash, rej, res);
};

Future.prototype.forkCatch = function Future$forkCatch(rec, rej, res){
  if(!isFuture(this)) throwInvalidContext('Future#fork', this);
  if(!isFunction(rec)) throwInvalidArgument('Future#fork', 0, 'to be a Function', rec);
  if(!isFunction(rej)) throwInvalidArgument('Future#fork', 1, 'to be a Function', rej);
  if(!isFunction(res)) throwInvalidArgument('Future#fork', 2, 'to be a Function', res);
  return this._interpret(function Future$forkCatch$recover(x){ rec(valueToError(x)) }, rej, res);
};

Future.prototype.value = function Future$value(res){
  if(!isFuture(this)) throwInvalidContext('Future#value', this);
  if(!isFunction(res)) throwInvalidArgument('Future#value', 0, 'to be a Function', res);
  var _this = this;
  return _this._interpret(Future$onCrash, function Future$value$rej(x){
    raise(error(
      'Future#value was called on a rejected Future\n' +
      '  Rejection: ' + show(x) + '\n' +
      '  Future: ' + _this.toString()
    ));
  }, res);
};

Future.prototype.done = function Future$done(callback){
  if(!isFuture(this)) throwInvalidContext('Future#done', this);
  if(!isFunction(callback)) throwInvalidArgument('Future#done', 0, 'to be a Function', callback);
  return this._interpret(Future$onCrash,
                         function Future$done$rej(x){ callback(x) },
                         function Future$done$res(x){ callback(null, x) });
};

Future.prototype.promise = function Future$promise(){
  var _this = this;
  return new Promise(function Future$promise$computation(res, rej){
    _this._interpret(Future$onCrash, rej, res);
  });
};

Future.prototype.extractLeft = function Future$extractLeft(){
  return [];
};

Future.prototype.extractRight = function Future$extractRight(){
  return [];
};

Future.prototype._transform = function Future$transform(action){
  return new Transformation(this, cons(action, nil));
};

export function Computation(computation){
  this._computation = computation;
}

Computation.prototype = Object.create(Future.prototype);

Computation.prototype._interpret = function Computation$interpret(rec, rej, res){
  var open = false, cancel = noop, cont = function(){ open = true };
  try{
    cancel = this._computation(function Computation$rej(x){
      cont = function Computation$rej$cont(){
        open = false;
        rej(x);
      };
      if(open){
        cont();
      }
    }, function Computation$res(x){
      cont = function Computation$res$cont(){
        open = false;
        res(x);
      };
      if(open){
        cont();
      }
    }) || noop;
  }catch(e){
    open = false;
    rec(e);
    return noop;
  }
  if(!(isFunction(cancel) && cancel.length === 0)){
    rec(typeError(
      'The computation was expected to return a nullary function or void\n' +
      '  Actual: ' + show(cancel)
    ));
  }
  cont();
  return function Computation$cancel(){
    if(open){
      open = false;
      cancel && cancel();
    }
  };
};

Computation.prototype.toString = function Computation$toString(){
  return 'Future(' + showf(this._computation) + ')';
};

export function Transformation(spawn, actions){
  this._spawn = spawn;
  this._actions = actions;
}

Transformation.prototype = Object.create(Future.prototype);

Transformation.prototype._transform = function Transformation$_transform(action){
  return new Transformation(this._spawn, cons(action, this._actions));
};

Transformation.prototype._interpret = function Transformation$interpret(rec, rej, res){
  return interpret(this, rec, rej, res);
};

Transformation.prototype.toString = function Transformation$toString(){
  var str = '', tail = this._actions;

  while(tail !== nil){
    str = '.' + tail.head.toString() + str;
    tail = tail.tail;
  }

  return this._spawn.toString() + str;
};

export function Crashed(error){
  this._error = error;
}

Crashed.prototype = Object.create(Future.prototype);

Crashed.prototype._ap = moop;
Crashed.prototype._parallelAp = moop;
Crashed.prototype._map = moop;
Crashed.prototype._bimap = moop;
Crashed.prototype._chain = moop;
Crashed.prototype._mapRej = moop;
Crashed.prototype._chainRej = moop;
Crashed.prototype._both = moop;
Crashed.prototype._or = moop;
Crashed.prototype._swap = moop;
Crashed.prototype._fold = moop;
Crashed.prototype._finally = moop;
Crashed.prototype._race = moop;

Crashed.prototype._interpret = function Crashed$interpret(rec){
  rec(this._error);
  return noop;
};

export function Rejected(value){
  this._value = value;
}

Rejected.prototype = Object.create(Future.prototype);

Rejected.prototype._ap = moop;
Rejected.prototype._parallelAp = moop;
Rejected.prototype._map = moop;
Rejected.prototype._chain = moop;
Rejected.prototype._race = moop;
Rejected.prototype._both = moop;
Rejected.prototype._and = moop;

Rejected.prototype._or = function Rejected$or(other){
  return other;
};

Rejected.prototype._finally = function Rejected$finally(other){
  return other._and(this);
};

Rejected.prototype._swap = function Rejected$swap(){
  return new Resolved(this._value);
};

Rejected.prototype._interpret = function Rejected$interpret(rec, rej){
  rej(this._value);
  return noop;
};

Rejected.prototype.extractLeft = function Rejected$extractLeft(){
  return [this._value];
};

Rejected.prototype.toString = function Rejected$toString(){
  return 'Future.reject(' + show(this._value) + ')';
};

export function reject(x){
  return new Rejected(x);
}

export function Resolved(value){
  this._value = value;
}

Resolved.prototype = Object.create(Future.prototype);

Resolved.prototype._race = moop;
Resolved.prototype._mapRej = moop;
Resolved.prototype._or = moop;

Resolved.prototype._and = function Resolved$and(other){
  return other;
};

Resolved.prototype._both = function Resolved$both(other){
  var left = this._value;
  return other._map(function Resolved$both$mapper(right){
    return [left, right];
  });
};

Resolved.prototype._swap = function Resolved$swap(){
  return new Rejected(this._value);
};

Resolved.prototype._finally = function Resolved$finally(other){
  var value = this._value;
  return other._map(function Resolved$finally$mapper(){
    return value;
  });
};

Resolved.prototype._interpret = function Resolved$interpret(rec, rej, res){
  res(this._value);
  return noop;
};

Resolved.prototype.extractRight = function Resolved$extractRight(){
  return [this._value];
};

Resolved.prototype.toString = function Resolved$toString(){
  return 'Future.of(' + show(this._value) + ')';
};

export function resolve(x){
  return new Resolved(x);
}

function Never(){
  this._isNever = true;
}

Never.prototype = Object.create(Future.prototype);

Never.prototype._ap = moop;
Never.prototype._parallelAp = moop;
Never.prototype._map = moop;
Never.prototype._bimap = moop;
Never.prototype._chain = moop;
Never.prototype._mapRej = moop;
Never.prototype._chainRej = moop;
Never.prototype._both = moop;
Never.prototype._or = moop;
Never.prototype._swap = moop;
Never.prototype._fold = moop;
Never.prototype._finally = moop;

Never.prototype._race = function Never$race(other){
  return other;
};

Never.prototype._interpret = function Never$interpret(){
  return noop;
};

Never.prototype.toString = function Never$toString(){
  return 'Future.never';
};

export var never = new Never();

export function isNever(x){
  return isFuture(x) && x._isNever === true;
}

function Eager(future){
  var _this = this;
  _this.rec = noop;
  _this.rej = noop;
  _this.res = noop;
  _this.crashed = false;
  _this.rejected = false;
  _this.resolved = false;
  _this.value = null;
  _this.cancel = future._interpret(function Eager$crash(x){
    _this.value = x;
    _this.crashed = true;
    _this.cancel = noop;
    _this.rec(x);
  }, function Eager$reject(x){
    _this.value = x;
    _this.rejected = true;
    _this.cancel = noop;
    _this.rej(x);
  }, function Eager$resolve(x){
    _this.value = x;
    _this.resolved = true;
    _this.cancel = noop;
    _this.res(x);
  });
}

Eager.prototype = Object.create(Future.prototype);

Eager.prototype._interpret = function Eager$interpret(rec, rej, res){
  if(this.crashed) rec(this.value);
  else if(this.rejected) rej(this.value);
  else if(this.resolved) res(this.value);
  else{
    this.rec = rec;
    this.rej = rej;
    this.res = res;
  }
  return this.cancel;
};

export var Action = {
  rejected: function Action$rejected(x){ this.cancel(); return new Rejected(x) },
  resolved: function Action$resolved(x){ this.cancel(); return new Resolved(x) },
  run: moop,
  cancel: noop
};

function nullaryActionToString(){
  return this.name + '()';
}

function defineNullaryAction(name, prototype){
  var _name = '_' + name;
  function NullaryAction(){}
  NullaryAction.prototype = Object.assign(Object.create(Action), prototype);
  NullaryAction.prototype.name = name;
  NullaryAction.prototype.toString = nullaryActionToString;
  Future.prototype[name] = function checkedNullaryTransformation(){
    if(!isFuture(this)) throwInvalidContext('Future#' + name, this);
    return this[_name]();
  };
  Future.prototype[_name] = function uncheckedNullaryTransformation(){
    return this._transform(new NullaryAction);
  };
  return NullaryAction;
}

function mapperActionToString(){
  return this.name + '(' + showf(this.mapper) + ')';
}

function defineMapperAction(name, prototype){
  var _name = '_' + name;
  function MapperAction(mapper){ this.mapper = mapper }
  MapperAction.prototype = Object.assign(Object.create(Action), prototype);
  MapperAction.prototype.name = name;
  MapperAction.prototype.toString = mapperActionToString;
  Future.prototype[name] = function checkedMapperTransformation(mapper){
    if(!isFuture(this)) throwInvalidContext('Future#' + name, this);
    if(!isFunction(mapper)) throwInvalidArgument('Future#' + name, 0, 'to be a Function', mapper);
    return this[_name](mapper);
  };
  Future.prototype[_name] = function uncheckedMapperTransformation(mapper){
    return this._transform(new MapperAction(mapper));
  };
  return MapperAction;
}

function bimapperActionToString(){
  return this.name + '(' + showf(this.lmapper) + ', ' + showf(this.rmapper) + ')';
}

function defineBimapperAction(name, prototype){
  var _name = '_' + name;
  function BimapperAction(lmapper, rmapper){ this.lmapper = lmapper; this.rmapper = rmapper }
  BimapperAction.prototype = Object.assign(Object.create(Action), prototype);
  BimapperAction.prototype.name = name;
  BimapperAction.prototype.toString = bimapperActionToString;
  Future.prototype[name] = function checkedBimapperTransformation(lm, rm){
    if(!isFuture(this)) throwInvalidContext('Future#' + name, this);
    if(!isFunction(lm)) throwInvalidArgument('Future#' + name, 0, 'to be a Function', lm);
    if(!isFunction(rm)) throwInvalidArgument('Future#' + name, 1, 'to be a Function', rm);
    return this[_name](lm, rm);
  };
  Future.prototype[_name] = function uncheckedBimapperTransformation(lm, rm){
    return this._transform(new BimapperAction(lm, rm));
  };
  return BimapperAction;
}

function otherActionToString(){
  return this.name + '(' + this.other.toString() + ')';
}

function defineOtherAction(name, prototype){
  var _name = '_' + name;
  function OtherAction(other){ this.other = other }
  OtherAction.prototype = Object.assign(Object.create(Action), prototype);
  OtherAction.prototype.name = name;
  OtherAction.prototype.toString = otherActionToString;
  Future.prototype[name] = function checkedOtherTransformation(other){
    if(!isFuture(this)) throwInvalidContext('Future#' + name, this);
    if(!isFuture(other)) throwInvalidFuture('Future#' + name, 0, other);
    return this[_name](other);
  };
  Future.prototype[_name] = function uncheckedOtherTransformation(other){
    return this._transform(new OtherAction(other));
  };
  return OtherAction;
}

function defineParallelAction(name, rec, rej, res, prototype){
  var ParallelAction = defineOtherAction(name, prototype);
  ParallelAction.prototype.run = function ParallelAction$run(early){
    var eager = new Eager(this.other);
    var action = new ParallelAction(eager);
    function ParallelAction$early(m){ early(m, action) }
    action.cancel = eager._interpret(
      function ParallelAction$rec(x){ rec(ParallelAction$early, x) },
      function ParallelAction$rej(x){ rej(ParallelAction$early, x) },
      function ParallelAction$res(x){ res(ParallelAction$early, x) }
    );
    return action;
  };
  return ParallelAction;
}

function apActionHandler(f){
  return isFunction(f) ?
         this.other._map(function ApAction$resolved$mapper(x){ return f(x) }) :
         new Crashed(typeError(
           'Future#' + this.name + ' expects its first argument to be a Future of a Function\n' +
           '  Actual: Future.of(' + show(f) + ')'
         ));
}

function chainActionHandler(x){
  var m;
  try{ m = this.mapper(x) }catch(e){ return new Crashed(e) }
  return isFuture(m) ? m : new Crashed(invalidFuture(
    'Future#' + this.name,
    'the function it\'s given to return a Future',
    m,
    '\n  From calling: ' + showf(this.mapper) + '\n  With: ' + show(x)
  ));
}

function returnOther(){
  return this.other;
}

function mapWith(mapper, create, value){
  var m;
  try{ m = create(mapper(value)) }catch(e){ m = new Crashed(e) }
  return m;
}

function mapRight(value){
  return mapWith(this.rmapper, resolve, value);
}

function earlyCrash(early, x){
  early(new Crashed(x));
}

function earlyReject(early, x){
  early(new Rejected(x));
}

function earlyResolve(early, x){
  early(new Resolved(x));
}

defineOtherAction('ap', {
  resolved: apActionHandler
});

defineMapperAction('map', {
  resolved: function MapAction$resolved(x){ return mapWith(this.mapper, resolve, x) }
});

defineBimapperAction('bimap', {
  resolved: mapRight,
  rejected: function BimapAction$rejected(x){ return mapWith(this.lmapper, reject, x) }
});

defineMapperAction('chain', {
  resolved: chainActionHandler
});

defineMapperAction('mapRej', {
  rejected: function MapRejAction$rejected(x){ return mapWith(this.mapper, reject, x) }
});

defineMapperAction('chainRej', {
  rejected: chainActionHandler
});

defineNullaryAction('swap', {
  rejected: Action.resolved,
  resolved: Action.rejected
});

defineBimapperAction('fold', {
  resolved: mapRight,
  rejected: function FoldAction$rejected(x){ return mapWith(this.lmapper, resolve, x) }
});

var finallyAction = {
  cancel: function FinallyAction$cancel(){ this.other._interpret(noop, noop, noop)() },
  rejected: function FinallyAction$rejected(x){ return this.other._and(new Rejected(x)) },
  resolved: function FinallyAction$resolved(x){
    return this.other._map(function FoldAction$resolved$mapper(){ return x });
  }
};

defineOtherAction('finally', finallyAction);
defineOtherAction('lastly', finallyAction);

defineOtherAction('and', {
  resolved: returnOther
});

defineOtherAction('or', {
  rejected: returnOther
});

defineParallelAction('_parallelAp', earlyCrash, earlyReject, noop, {
  resolved: apActionHandler
});

defineParallelAction('race', earlyCrash, earlyReject, earlyResolve, {});

defineParallelAction('both', earlyCrash, earlyReject, noop, {
  resolved: function BothAction$resolved(x){
    return this.other._map(function BothAction$resolved$mapper(y){ return [x, y] });
  }
});
