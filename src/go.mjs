/*eslint consistent-return: 0 */

import {application1, func} from './internal/check';
import {captureContext} from './internal/debug';
import {typeError, invalidFuture, invalidArgument, makeError} from './internal/error';
import {isIteration} from './internal/iteration';
import {cat} from './internal/list';
import {isIterator} from './internal/predicates';
import {Undetermined, Synchronous, Asynchronous} from './internal/timing';
import {show, noop} from './internal/utils';
import {createInterpreter, isFuture} from './future';

export function invalidIteration(o){
  return typeError(
    'The iterator did not return a valid iteration from iterator.next()\n' +
    '  Actual: ' + show(o)
  );
}

export function invalidState(x){
  return invalidFuture(
    'go() expects the value produced by the iterator', x,
    '\n  Tip: If you\'re using a generator, make sure you always yield a Future'
  );
}

export var Go = createInterpreter(1, 'go', function Go$interpret(rec, rej, res){

  var _this = this, timing = Undetermined, cancel = noop, state, value, iterator;

  var context = captureContext(
    _this.context,
    'interpreting a Future created with do-notation',
    Go$interpret
  );

  try{
    iterator = _this.$1();
  }catch(e){
    rec(makeError(e, _this, context));
    return noop;
  }

  if(!isIterator(iterator)){
    rec(makeError(
      invalidArgument('go', 0, 'return an iterator, maybe you forgot the "*"', iterator),
      _this,
      context
    ));
    return noop;
  }

  function resolved(x){
    value = x;
    if(timing === Asynchronous){
      context = cat(state.value.context, context);
      return drain();
    }
    timing = Synchronous;
  }

  function crash(e){
    rec(makeError(e, state.value, cat(state.value.context, context)));
  }

  function drain(){
    //eslint-disable-next-line no-constant-condition
    while(true){
      try{
        state = iterator.next(value);
      }catch(e){
        return rec(makeError(e, _this, context));
      }
      if(!isIteration(state)) return rec(makeError(invalidIteration(state), _this, context));
      if(state.done) break;
      if(!isFuture(state.value)) return rec(makeError(invalidState(state.value), _this, context));
      timing = Undetermined;
      cancel = state.value._interpret(crash, rej, resolved);
      if(timing === Undetermined) return timing = Asynchronous;
    }
    res(state.value);
  }

  drain();

  return function Go$cancel(){ cancel() };

});

export function go(generator){
  return new Go(application1(go, func, generator), generator);
}
