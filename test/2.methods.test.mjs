import show from 'sanctuary-show';
import {testMethod, futureArg, functionArg} from './props';
import {eq, noop, throws, error} from './util';
import {mock as instance} from './futures';

describe('Future prototype', function (){

  describe('and()', function (){
    testMethod(instance, 'and', [futureArg]);
  });

  describe('ap()', function (){
    testMethod(instance, 'ap', [futureArg]);
  });

  describe('bimap()', function (){
    testMethod(instance, 'bimap', [functionArg, functionArg]);
  });

  describe('both()', function (){
    testMethod(instance, 'both', [futureArg]);
  });

  describe('chain()', function (){
    testMethod(instance, 'chain', [functionArg]);
  });

  describe('chainRej()', function (){
    testMethod(instance, 'chainRej', [functionArg]);
  });

  describe('done()', function (){
    testMethod(instance, 'done', [functionArg]);

    it('passes the rejection value as first parameter', function (done){
      var mock = Object.create(instance);
      mock._interpret = function (_, l){l(1)};
      mock.done(function (x, y){
        eq(x, 1);
        eq(y, undefined);
        done();
      });
    });

    it('passes the resolution value as second parameter', function (done){
      var mock = Object.create(instance);
      mock._interpret = function (_, l, r){r(1)};
      mock.done(function (x, y){
        eq(x, null);
        eq(y, 1);
        done();
      });
    });
  });

  describe('finally()', function (){
    testMethod(instance, 'finally', [futureArg]);
  });

  describe('fold()', function (){
    testMethod(instance, 'fold', [functionArg, functionArg]);
  });

  describe('fork()', function (){
    testMethod(instance, 'fork', [functionArg, functionArg]);

    it('dispatches to #_interpret()', function (done){
      var a = function (){};
      var b = function (){};
      var mock = Object.create(instance);

      mock._interpret = function (rec, rej, res){
        eq(typeof rec, 'function');
        eq(rej, a);
        eq(res, b);
        done();
      };

      mock.fork(a, b);
    });

    it('throws the interpretation crash value', function (){
      var mock = Object.create(instance);
      mock._interpret = function (rec){ rec(error) };
      throws(function (){ return mock.fork(noop, noop) }, error);
    });
  });

  describe('forkCatch()', function (){
    testMethod(instance, 'forkCatch', [functionArg, functionArg, functionArg]);

    it('dispatches to #_interpret()', function (done){
      var a = function (){};
      var b = function (){};
      var c = function (){};
      var mock = Object.create(instance);

      mock._interpret = function (rec, rej, res){
        eq(rec, a);
        eq(rej, b);
        eq(res, c);
        done();
      };

      mock.forkCatch(a, b, c);
    });
  });

  describe('lastly()', function (){
    testMethod(instance, 'lastly', [futureArg]);
  });

  describe('finally()', function (){
    testMethod(instance, 'finally', [futureArg]);
  });

  describe('map()', function (){
    testMethod(instance, 'map', [functionArg]);
  });

  describe('mapRej()', function (){
    testMethod(instance, 'mapRej', [functionArg]);
  });

  describe('alt()', function (){
    testMethod(instance, 'alt', [futureArg]);
  });

  describe('or()', function (){
    testMethod(instance, 'or', [futureArg]);
  });

  describe('promise()', function (){
    testMethod(instance, 'promise', []);

    it('returns a Promise', function (){
      var mock = Object.create(instance);
      mock._interpret = noop;
      var actual = mock.promise();
      eq(actual instanceof Promise, true);
    });

    it('resolves if the Future resolves', function (done){
      var mock = Object.create(instance);
      mock._interpret = function (_, l, r){ return r(1) };
      mock.promise().then(
        function (x){ return (eq(x, 1), done()) },
        done
      );
    });

    it('rejects if the Future rejects', function (done){
      var mock = Object.create(instance);
      mock._interpret = function (_, l){ return l(1) };
      mock.promise().then(
        function (){ return done(new Error('It resolved')) },
        function (x){ return (eq(x, 1), done()) }
      );
    });
  });

  describe('race()', function (){
    testMethod(instance, 'race', [futureArg]);
  });

  describe('swap()', function (){
    testMethod(instance, 'swap', []);
  });

  describe('value()', function (){
    testMethod(instance, 'value', [functionArg]);

    it('dispatches to #_interpret(), using the input as resolution callback', function (done){
      var res = function (){};
      var mock = Object.create(instance);

      mock._interpret = function (rec, l, r){
        eq(typeof rec, 'function');
        eq(typeof l, 'function');
        eq(r, res);
        done();
      };

      mock.value(res);
    });

    it('throws when _interpret calls the rejection callback', function (){
      var mock = Object.create(instance);
      mock._interpret = function (rec, rej){rej(1)};
      throws(mock.value.bind(mock, noop), new Error(
        'Future#value was called on a rejected Future\n' +
        '  Rejection: 1\n' +
        '  Future: ' + show(instance)
      ));
    });
  });

  describe('pipe()', function (){
    testMethod(instance, 'pipe', [functionArg]);

    it('applies the given function to itself', function (done){
      instance.pipe(function (x){
        eq(x, instance);
        done();
      });
    });
  });

});
