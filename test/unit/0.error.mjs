import {eq, assertStackTrace, error as mockError} from '../util/util';
import {mock} from '../util/futures';
import {namespace, name, version} from '../../src/internal/const';
import {nil, cons, cat} from '../../src/internal/list';
import {
  error,
  typeError,
  invalidArgument,
  invalidContext,
  invalidFutureArgument,
  makeError,
  contextToStackTrace
} from '../../src/internal/error';

describe('error', function (){

  describe('error', function (){

    it('constructs an Error', function (){
      eq(error('hello'), new Error('hello'));
    });

  });

  describe('typeError', function (){

    it('constructs a TypeError', function (){
      eq(typeError('hello'), new TypeError('hello'));
    });

  });

  describe('invalidArgument', function (){

    it('constructs a TypeError', function (){
      eq(invalidArgument('Test', 1, 'foo', 'bar'), new TypeError(
        'Test() expects its second argument to foo.\n  Actual: "bar" :: String'
      ));
    });

  });

  describe('invalidContext', function (){

    it('constructs a TypeError', function (){
      eq(invalidContext('Test', 'foo'), new TypeError(
        'Test() was invoked outside the context of a Future. You might want ' +
        'to use a dispatcher instead\n  Called on: "foo"'
      ));
    });

  });

  describe('invalidFutureArgument', function (){

    var mockType = function (identifier){
      return {'constructor': {'@@type': identifier}, '@@show': function (){
        return 'mockType("' + identifier + '")';
      }};
    };

    it('warns us when nothing seems wrong', function (){
      var actual = invalidFutureArgument('Foo', 0, mockType(namespace + '/' + name + '@' + version));
      eq(actual, new TypeError(
        'Foo() expects its first argument to be a valid Future.\n' +
        'Nothing seems wrong. Contact the Fluture maintainers.\n' +
        '  Actual: mockType("fluture/Future@5") :: Future'
      ));
    });

    it('Warns us about Futures from other sources', function (){
      var actual = invalidFutureArgument('Foo', 0, mockType('bobs-tinkershop/' + name + '@' + version));
      eq(actual, new TypeError(
        'Foo() expects its first argument to be a valid Future.\n' +
        'The Future was not created by fluture. ' +
        'Make sure you transform other Futures to fluture Futures. ' +
        'Got a Future from bobs-tinkershop.\n' +
        '  See: https://github.com/fluture-js/Fluture#casting-futures\n' +
        '  Actual: mockType("bobs-tinkershop/Future@5") :: Future'
      ));
    });

    it('Warns us about Futures from unnamed sources', function (){
      var actual = invalidFutureArgument('Foo', 0, mockType(name));
      eq(actual, new TypeError(
        'Foo() expects its first argument to be a valid Future.\n' +
        'The Future was not created by fluture. ' +
        'Make sure you transform other Futures to fluture Futures. ' +
        'Got an unscoped Future.\n' +
        '  See: https://github.com/fluture-js/Fluture#casting-futures\n' +
        '  Actual: mockType("Future") :: Future'
      ));
    });

    it('Warns about older versions', function (){
      var actual = invalidFutureArgument('Foo', 0, mockType(namespace + '/' + name + '@' + (version - 1)));
      eq(actual, new TypeError(
        'Foo() expects its first argument to be a valid Future.\n' +
        'The Future was created by an older version of fluture. ' +
        'This means that one of the sources which creates Futures is outdated. ' +
        'Update this source, or transform its created Futures to be compatible.\n' +
        '  See: https://github.com/fluture-js/Fluture#casting-futures\n' +
        '  Actual: mockType("fluture/Future@4") :: Future'
      ));
    });

    it('Warns about newer versions', function (){
      var actual = invalidFutureArgument('Foo', 0, mockType(namespace + '/' + name + '@' + (version + 1)));
      eq(actual, new TypeError(
        'Foo() expects its first argument to be a valid Future.\n' +
        'The Future was created by a newer version of fluture. ' +
        'This means that one of the sources which creates Futures is outdated. ' +
        'Update this source, or transform its created Futures to be compatible.\n' +
        '  See: https://github.com/fluture-js/Fluture#casting-futures\n' +
        '  Actual: mockType("fluture/Future@6") :: Future'
      ));
    });

  });

  describe('makeError', function (){

    it('converts any value to an Error', function (){
      var evilValue = {};
      evilValue.__defineGetter__('name', () => { throw new Error });
      evilValue.__defineGetter__('stack', () => { throw new Error });

      eq(makeError(new Error('test')) instanceof Error, true);
      eq(makeError(new TypeError('test')) instanceof Error, true);
      eq(makeError('test') instanceof Error, true);
      eq(makeError({foo: 'bar'}) instanceof Error, true);
      eq(makeError(evilValue) instanceof Error, true);
      eq(makeError(null) instanceof Error, true);
      eq(makeError({crash: null}) instanceof Error, true);
    });

    it('creates an error which encompasses the given error', function (){
      var context = cons({stack: 'hello'}, cons({stack: 'world'}, nil));
      var e = makeError(mockError, mock, context);
      eq(e.name, 'Error');
      eq(e.message, mockError.message);
      eq(e.reason, mockError);
      eq(e.context, context);
      eq(e.future, mock);
      assertStackTrace('Error: Intentional error for unit testing', e.stack);

      var context2 = cons({stack: 'foo'}, cons({stack: 'bar'}, nil));
      var e2 = makeError(e, mock, context2);
      eq(e2.name, 'Error');
      eq(e2.message, mockError.message);
      eq(e2.reason, mockError);
      eq(e2.context, cat(context, context2));
      eq(e2.future, mock);
      assertStackTrace('Error: Intentional error for unit testing', e2.stack);
    });

  });

  describe('contextToStackTrace', function (){

    it('converts a nested context structure to a stack trace', function (){
      eq(contextToStackTrace(cons({stack: 'hello'}, cons({stack: 'world'}, nil))), 'hello\nworld\n');
    });

  });

});
