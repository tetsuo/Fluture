import {application1, positiveInteger, application, futureArray} from './internal/check';
import {captureContext} from './internal/debug';
import {makeError} from './internal/error';
import {noop} from './internal/utils';
import {createInterpreter} from './future';
import {resolve} from './resolve';

export var Parallel = createInterpreter(2, 'parallel', function Parallel$interpret(rec, rej, res){

  var _futures = this.$2, _length = _futures.length, _max = Math.min(_length, this.$1);
  var cancels = new Array(_length), out = new Array(_length);
  var cursor = 0, running = 0, blocked = false;
  var context = captureContext(this.context, 'consuming a parallel Future', Parallel$interpret);

  function Parallel$cancel(){
    cursor = _length;
    for(var n = 0; n < _length; n++) cancels[n] && cancels[n]();
  }

  function Parallel$run(idx){
    running++;
    cancels[idx] = _futures[idx]._interpret(function Parallel$rec(e){
      cancels[idx] = noop;
      Parallel$cancel();
      rec(makeError(e, _futures[idx], context));
    }, function Parallel$rej(reason){
      cancels[idx] = noop;
      Parallel$cancel();
      rej(reason);
    }, function Parallel$res(value){
      cancels[idx] = noop;
      out[idx] = value;
      running--;
      if(cursor === _length && running === 0) res(out);
      else if(blocked) Parallel$drain();
    });
  }

  function Parallel$drain(){
    blocked = false;
    while(cursor < _length && running < _max) Parallel$run(cursor++);
    blocked = true;
  }

  Parallel$drain();

  return Parallel$cancel;

});

var emptyArray = resolve([]);

export function parallel(max){
  var context1 = application1(parallel, positiveInteger, max);
  return function parallel(ms){
    var context2 = application(2, parallel, futureArray, ms, context1);
    return ms.length === 0 ? emptyArray : new Parallel(context2, max, ms);
  };
}
