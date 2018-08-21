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

Future.prototype.ap = function Future$ap(other){
  if(!isFuture(this)) throwInvalidContext('Future#ap', this);
  if(!isFuture(other)) throwInvalidFuture('Future#ap', 0, other);
  return this._ap(other);
};

Future.prototype.map = function Future$map(mapper){
  if(!isFuture(this)) throwInvalidContext('Future#map', this);
  if(!isFunction(mapper)) throwInvalidArgument('Future#map', 0, 'to be a Function', mapper);
  return this._map(mapper);
};

Future.prototype.bimap = function Future$bimap(lmapper, rmapper){
  if(!isFuture(this)) throwInvalidContext('Future#bimap', this);
  if(!isFunction(lmapper)) throwInvalidArgument('Future#bimap', 0, 'to be a Function', lmapper);
  if(!isFunction(rmapper)) throwInvalidArgument('Future#bimap', 1, 'to be a Function', rmapper);
  return this._bimap(lmapper, rmapper);
};

Future.prototype.chain = function Future$chain(mapper){
  if(!isFuture(this)) throwInvalidContext('Future#chain', this);
  if(!isFunction(mapper)) throwInvalidArgument('Future#chain', 0, 'to be a Function', mapper);
  return this._chain(mapper);
};

Future.prototype.mapRej = function Future$mapRej(mapper){
  if(!isFuture(this)) throwInvalidContext('Future#mapRej', this);
  if(!isFunction(mapper)) throwInvalidArgument('Future#mapRej', 0, 'to be a Function', mapper);
  return this._mapRej(mapper);
};

Future.prototype.chainRej = function Future$chainRej(mapper){
  if(!isFuture(this)) throwInvalidContext('Future#chainRej', this);
  if(!isFunction(mapper)) throwInvalidArgument('Future#chainRej', 0, 'to be a Function', mapper);
  return this._chainRej(mapper);
};

Future.prototype.race = function Future$race(other){
  if(!isFuture(this)) throwInvalidContext('Future#race', this);
  if(!isFuture(other)) throwInvalidFuture('Future#race', 0, other);
  return this._race(other);
};

Future.prototype.both = function Future$both(other){
  if(!isFuture(this)) throwInvalidContext('Future#both', this);
  if(!isFuture(other)) throwInvalidFuture('Future#both', 0, other);
  return this._both(other);
};

Future.prototype.and = function Future$and(other){
  if(!isFuture(this)) throwInvalidContext('Future#and', this);
  if(!isFuture(other)) throwInvalidFuture('Future#and', 0, other);
  return this._and(other);
};

Future.prototype.or = function Future$or(other){
  if(!isFuture(this)) throwInvalidContext('Future#or', this);
  if(!isFuture(other)) throwInvalidFuture('Future#or', 0, other);
  return this._or(other);
};

Future.prototype.swap = function Future$swap(){
  if(!isFuture(this)) throwInvalidContext('Future#ap', this);
  return this._swap();
};

Future.prototype.fold = function Future$fold(lmapper, rmapper){
  if(!isFuture(this)) throwInvalidContext('Future#ap', this);
  if(!isFunction(lmapper)) throwInvalidArgument('Future#fold', 0, 'to be a Function', lmapper);
  if(!isFunction(rmapper)) throwInvalidArgument('Future#fold', 1, 'to be a Function', rmapper);
  return this._fold(lmapper, rmapper);
};

Future.prototype.finally = function Future$finally(other){
  if(!isFuture(this)) throwInvalidContext('Future#finally', this);
  if(!isFuture(other)) throwInvalidFuture('Future#finally', 0, other);
  return this._finally(other);
};

Future.prototype.lastly = function Future$lastly(other){
  if(!isFuture(this)) throwInvalidContext('Future#lastly', this);
  if(!isFuture(other)) throwInvalidFuture('Future#lastly', 0, other);
  return this._finally(other);
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

Future.prototype._ap = function Future$ap(other){
  return this._transform(new ApAction(other));
};

Future.prototype._parallelAp = function Future$pap(other){
  return this._transform(new ParallelApAction(other));
};

Future.prototype._map = function Future$map(mapper){
  return this._transform(new MapAction(mapper));
};

Future.prototype._bimap = function Future$bimap(lmapper, rmapper){
  return this._transform(new BimapAction(lmapper, rmapper));
};

Future.prototype._chain = function Future$chain(mapper){
  return this._transform(new ChainAction(mapper));
};

Future.prototype._mapRej = function Future$mapRej(mapper){
  return this._transform(new MapRejAction(mapper));
};

Future.prototype._chainRej = function Future$chainRej(mapper){
  return this._transform(new ChainRejAction(mapper));
};

Future.prototype._race = function Future$race(other){
  return isNever(other) ? this : this._transform(new RaceAction(other));
};

Future.prototype._both = function Future$both(other){
  return this._transform(new BothAction(other));
};

Future.prototype._and = function Future$and(other){
  return this._transform(new AndAction(other));
};

Future.prototype._or = function Future$or(other){
  return this._transform(new OrAction(other));
};

Future.prototype._swap = function Future$swap(){
  return this._transform(new SwapAction);
};

Future.prototype._fold = function Future$fold(lmapper, rmapper){
  return this._transform(new FoldAction(lmapper, rmapper));
};

Future.prototype._finally = function Future$finally(other){
  return this._transform(new FinallyAction(other));
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

function createNullaryAction(name, prototype){
  function NullaryAction(mapper){ this.mapper = mapper }
  NullaryAction.prototype = Object.assign(Object.create(Action), prototype);
  NullaryAction.prototype.name = name;
  NullaryAction.prototype.toString = nullaryActionToString;
  return NullaryAction;
}

function mapperActionToString(){
  return this.name + '(' + showf(this.mapper) + ')';
}

function createMapperAction(name, prototype){
  function MapperAction(mapper){ this.mapper = mapper }
  MapperAction.prototype = Object.assign(Object.create(Action), prototype);
  MapperAction.prototype.name = name;
  MapperAction.prototype.toString = mapperActionToString;
  return MapperAction;
}

function bimapperActionToString(){
  return this.name + '(' + showf(this.lmapper) + ', ' + showf(this.rmapper) + ')';
}

function createBimapperAction(name, prototype){
  function BimapperAction(lmapper, rmapper){ this.lmapper = lmapper; this.rmapper = rmapper }
  BimapperAction.prototype = Object.assign(Object.create(Action), prototype);
  BimapperAction.prototype.name = name;
  BimapperAction.prototype.toString = bimapperActionToString;
  return BimapperAction;
}

function otherActionToString(){
  return this.name + '(' + this.other.toString() + ')';
}

function createOtherAction(name, prototype){
  function OtherAction(other){ this.other = other }
  OtherAction.prototype = Object.assign(Object.create(Action), prototype);
  OtherAction.prototype.name = name;
  OtherAction.prototype.toString = otherActionToString;
  return OtherAction;
}

function createParallelAction(name, rej, res, prototype){
  var ParallelAction = createOtherAction(name, prototype);
  ParallelAction.prototype.run = function ParallelAction$run(early){
    var eager = new Eager(this.other);
    var action = new ParallelAction(eager);
    action.cancel = eager._interpret(function ParallelAction$rec(x){
      early(new Crashed(x), action);
    }, rej ? function ParallelAction$rej(x){
      early(new Rejected(x), action);
    } : noop, res ? function ParallelAction$rej(x){
      early(new Resolved(x), action);
    } : noop);
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

export var ApAction = createOtherAction('ap', {
  resolved: apActionHandler
});

export var MapAction = createMapperAction('map', {
  resolved: function MapAction$resolved(x){ return mapWith(this.mapper, resolve, x) }
});

export var BimapAction = createBimapperAction('bimap', {
  resolved: mapRight,
  rejected: function BimapAction$rejected(x){ return mapWith(this.lmapper, reject, x) }
});

export var ChainAction = createMapperAction('chain', {
  resolved: chainActionHandler
});

export var MapRejAction = createMapperAction('mapRej', {
  rejected: function MapRejAction$rejected(x){ return mapWith(this.mapper, reject, x) }
});

export var ChainRejAction = createMapperAction('chainRej', {
  rejected: chainActionHandler
});

export var SwapAction = createNullaryAction('swap', {
  rejected: Action.resolved,
  resolved: Action.rejected
});

export var FoldAction = createBimapperAction('fold', {
  resolved: mapRight,
  rejected: function FoldAction$rejected(x){ return mapWith(this.lmapper, resolve, x) }
});

export var FinallyAction = createOtherAction('finally', {
  cancel: function FinallyAction$cancel(){ this.other._interpret(noop, noop, noop)() },
  rejected: function FinallyAction$rejected(x){ return this.other._and(new Rejected(x)) },
  resolved: function FinallyAction$resolved(x){
    return this.other._map(function FoldAction$resolved$mapper(){ return x });
  }
});

export var AndAction = createOtherAction('and', {
  resolved: returnOther
});

export var OrAction = createOtherAction('or', {
  rejected: returnOther
});

export var ParallelApAction = createParallelAction('_parallelAp', true, false, {
  resolved: apActionHandler
});

export var RaceAction = createParallelAction('race', true, true, {});

export var BothAction = createParallelAction('both', true, false, {
  resolved: function BothAction$resolved(x){
    return this.other._map(function BothAction$resolved$mapper(y){ return [x, y] });
  }
});
