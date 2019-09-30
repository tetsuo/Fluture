import {after, never} from '../../index.mjs';
import {eq, assertValidFuture, assertResolved, test, error} from '../util/util.mjs';
import {testFunction, positiveIntegerArg, anyArg} from '../util/props.mjs';

testFunction('after', after, [positiveIntegerArg, anyArg], assertValidFuture);

test('returns Never when given Infinity', function (){
  eq(after(Infinity)(1), never);
});

test('resolves with the given value', function (){
  return assertResolved(after(20)(1), 1);
});

test('clears its internal timeout when cancelled', function (done){
  const fail = () => done(error);
  after(20)(1)._interpret(done, fail, fail)();
  setTimeout(done, 25);
});

test('returns array with the value', function (){
  eq(after(20)(1).extractRight(), [1]);
});

test('returns the code to create the After when cast to String', function (){
  eq(after(20)(1).toString(), 'after (20) (1)');
});
