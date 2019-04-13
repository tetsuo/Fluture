import {application1, application, func, future} from './internal/check';
import {noop, show, raise} from './internal/utils';
import {invalidFuture, makeError} from './internal/error';
import {captureContext} from './internal/debug';
import {createInterpreter, isFuture} from './future';

function invalidDisposal(m, f, x){
  return invalidFuture(
    'hook() expects the return value from the first function it\'s given', m,
    '\n  From calling: ' + show(f) + '\n  With: ' + show(x)
  );
}

function invalidConsumption(m, f, x){
  return invalidFuture(
    'hook() expects the return value from the second function it\'s given', m,
    '\n  From calling: ' + show(f) + '\n  With: ' + show(x)
  );
}

export var Hook = createInterpreter(3, 'hook', function Hook$interpret(rec, rej, res){

  var _this = this, _acquire = this.$1, _dispose = this.$2, _consume = this.$3;
  var cancel, cancelConsume = noop, resource, value, cont = noop;
  var context = captureContext(_this.context, 'interpreting a hooked Future', Hook$interpret);

  function Hook$done(){
    cont(value);
  }

  function Hook$dispose(){
    var disposal;
    try{
      disposal = _dispose(resource);
    }catch(e){
      return rec(makeError(e, _this, context));
    }
    if(!isFuture(disposal)){
      return rec(makeError(invalidDisposal(disposal, _dispose, resource), _this, context));
    }
    disposal._interpret(Hook$disposalCrashed, Hook$disposalRejected, Hook$done);
    cancel = Hook$cancelDisposal;
  }

  function Hook$cancelConsumption(){
    cancelConsume();
    Hook$dispose();
    Hook$cancelDisposal();
  }

  function Hook$cancelDisposal(){
    cont = noop;
  }

  function Hook$disposalCrashed(x){
    rec(makeError(x, _this, context));
  }

  function Hook$disposalRejected(x){
    rec(makeError(new Error('The disposal Future rejected with ' + show(x)), _this, context));
  }

  function Hook$consumptionException(x){
    context = captureContext(context, 'resource consumption crashing', Hook$dispose);
    cont = rec;
    value = x;
    Hook$dispose();
  }

  function Hook$consumptionRejected(x){
    context = captureContext(context, 'resource consumption failing', Hook$consumptionRejected);
    cont = rej;
    value = x;
    Hook$dispose();
  }

  function Hook$consumptionResolved(x){
    context = captureContext(context, 'resource consumption', Hook$consumptionResolved);
    cont = res;
    value = x;
    Hook$dispose();
  }

  function Hook$consume(x){
    context = captureContext(context, 'hook acquiring a resource', Hook$consume);
    resource = x;
    var consumption;
    try{
      consumption = _consume(resource);
    }catch(e){
      return Hook$consumptionException(makeError(e, _this, context));
    }
    if(!isFuture(consumption)){
      return Hook$consumptionException(makeError(
        invalidConsumption(consumption, _consume, resource),
        _this,
        context
      ));
    }
    cancel = Hook$cancelConsumption;
    cancelConsume = consumption._interpret(
      Hook$consumptionException,
      Hook$consumptionRejected,
      Hook$consumptionResolved
    );
  }

  var cancelAcquire = _acquire._interpret(rec, rej, Hook$consume);
  cancel = cancel || cancelAcquire;

  return function Hook$fork$cancel(){
    rec = raise;
    cancel();
  };

});

export function hook(acquire){
  var context1 = application1(hook, future, acquire);
  return function hook(dispose){
    var context2 = application(2, hook, func, dispose, context1);
    return function hook(consume){
      var context3 = application(3, hook, func, consume, context2);
      return new Hook(context3, acquire, dispose, consume);
    };
  };
}
