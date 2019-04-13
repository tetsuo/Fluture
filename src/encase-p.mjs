import {application1, application, func, any} from './internal/check';
import {captureContext} from './internal/debug';
import {makeError, typeError} from './internal/error';
import {isThenable} from './internal/predicates';
import {noop, show} from './internal/utils';
import {createInterpreter} from './future';

function invalidPromise(p, f, a){
  return typeError(
    'encaseP() expects the function it\'s given to return a Promise/Thenable'
    + '\n  Actual: ' + show(p) + '\n  From calling: ' + show(f)
    + '\n  With: ' + show(a)
  );
}

export var EncaseP = createInterpreter(2, 'encaseP', function EncaseP$interpret(rec, rej, res){
  var open = true, fn = this.$1, arg = this.$2, p;
  var context = captureContext(this.context, 'consuming an encased Future', EncaseP$interpret);
  try{
    p = fn(arg);
  }catch(e){
    rec(makeError(e, this, context));
    return noop;
  }
  if(!isThenable(p)){
    rec(makeError(invalidPromise(p, fn, arg), this, context));
    return noop;
  }
  p.then(function EncaseP$res(x){
    if(open){
      open = false;
      res(x);
    }
  }, function EncaseP$rej(x){
    if(open){
      open = false;
      rej(x);
    }
  });
  return function EncaseP$cancel(){ open = false };
});

export function encaseP(f){
  var context1 = application1(encaseP, func, f);
  return function encaseP(x){
    var context2 = application(2, encaseP, any, x, context1);
    return new EncaseP(context2, f, x);
  };
}
