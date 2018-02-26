/*eslint consistent-return: 0, no-cond-assign: 0*/

import {Core, isFuture} from './core';
import {isFunction, isIterator} from './internal/is';
import {isIteration} from './internal/iteration';
import {show, showf, noop} from './internal/fn';
import {typeError, invalidFuture, invalidArgument, someError} from './internal/error';
import {throwInvalidArgument} from './internal/throw';
import {Undetermined, Synchronous, Asynchronous} from './internal/timing';

export function invalidIteration(o){
  return typeError(
    'The iterator did not return a valid iteration from iterator.next()\n' +
    '  Actual: ' + show(o)
  );
}

export function invalidState(x){
  return invalidFuture(
    'Future.do',
    'the iterator to produce only valid Futures',
    x,
    '\n  Tip: If you\'re using a generator, make sure you always yield a Future'
  );
}

export function Go(generator){
  this._generator = generator;
}

Go.prototype = Object.create(Core);

Go.prototype._interpret = function Go$interpret(rec, rej, res){

  var timing = Undetermined, cancel = noop, state, value, iterator;

  try{
    iterator = this._generator();
  }catch(e){
    rec(someError('Future.do was spawning an iterator', e, showf(this._generator)));
    return noop;
  }

  if(!isIterator(iterator)){
    rec(someError('Future.do about to consume the created iterator', invalidArgument(
      'Future.do', 0, 'return an iterator, maybe you forgot the "*"', iterator
    )));
    return noop;
  }

  function exception(e){
    rec(someError('Future.do was consuming a generated Future', e, state.value.toString()));
  }

  function resolved(x){
    value = x;
    if(timing === Asynchronous) return drain();
    timing = Synchronous;
  }

  function drain(){
    try{
      //eslint-disable-next-line no-constant-condition
      while(true){
        state = iterator.next(value);
        if(!isIteration(state)) return rec(someError(
          'Future.do was obtaining the next Future',
          invalidIteration(state))
        );
        if(state.done) break;
        if(!isFuture(state.value)) return rec(someError(
          'Future.do was about to consume the next Future',
          invalidState(state.value)
        ));
        timing = Undetermined;
        cancel = state.value._interpret(exception, rej, resolved);
        if(timing === Undetermined) return timing = Asynchronous;
      }
      res(state.value);
    }catch(e){
      rec(someError('Future.do was passing control to the iterator', e, showf(iterator.next)));
    }
  }

  drain();

  return function Go$cancel(){ cancel() };

};

Go.prototype.toString = function Go$toString(){
  return 'Future.do(' + showf(this._generator) + ')';
};

export function go(generator){
  if(!isFunction(generator)) throwInvalidArgument('Future.do', 0, 'be a Function', generator);
  return new Go(generator);
}
