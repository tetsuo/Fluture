import Future from '../../index.js';
import {noop, eq, assertCrashed, assertResolved, error, assertValidFuture, test} from '../util/util.js';
import {testFunction, functionArg} from '../util/props.js';

testFunction('Future', Future, [functionArg], assertValidFuture);

test('crashes when the computation throws an error', function (){
  var m = Future(function (){ throw error });
  return assertCrashed(m, error);
});

test('crashes when the computation returns nonsense', function (){
  var m = Future(function (){ return 1 });
  return assertCrashed(m, new TypeError(
    'The computation was expected to return a nullary cancellation function\n' +
    '  Actual: 1'
  ));
});

test('does not crash when the computation returns a nullary function', function (done){
  var m = Future(function (){ return function (){} });
  m._interpret(done, noop, noop);
});

test('settles using the last synchronously called continuation', function (){
  var actual = Future(function (rej, res){
    res(1);
    rej(2);
    res(3);
    return noop;
  });
  return assertResolved(actual, 3);
});

test('settles using the first asynchronously called continuation', function (){
  var actual = Future(function (rej, res){
    setTimeout(res, 10, 1);
    setTimeout(res, 50, 2);
    return noop;
  });
  return assertResolved(actual, 1);
});

test('stops continuations from being called after cancellation', function (done){
  const fail = () => done(error);
  Future(function (rej, res){
    setTimeout(res, 20, 1);
    setTimeout(rej, 20, 1);
    return noop;
  })
  ._interpret(done, fail, fail)();
  setTimeout(done, 25);
});

test('cannot continue during cancellation (#216)', function (done){
  const fail = () => done(error);
  Future(function (rej, res){
    return function (){
      rej();
      res();
    };
  })
  ._interpret(done, fail, fail)();
});

test('stops cancellation from being called after continuations', function (done){
  var m = Future(function (rej, res){
    res(1);
    return function (){ done(error) };
  });
  var cancel = m._interpret(done, noop, noop);
  cancel();
});

test('can be cast to String', function (){
  var m = Future(function (rej, res){ res() });
  eq(m.toString(), 'Future (function (rej, res){ res() })');
});
