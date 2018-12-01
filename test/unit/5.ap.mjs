import chai from 'chai';
import {Future, ap, of, reject, after} from '../../index.mjs';
import * as U from '../util/util';
import {testFunction, applyArg} from '../util/props';

var expect = chai.expect;

describe('ap()', function (){

  testFunction('ap', ap, [applyArg, applyArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('crashes when the other does not resolve to a Function', function (){
      var m = ap(of(null), of(1));
      return U.assertCrashed(m, new TypeError(
        'Future#ap() expects its first argument to be a Future of a Function\n' +
        '  Actual: Future.of(null)'
      ));
    });

    it('calls the function contained in the given Future to its contained value', function (){
      var actual = ap(of(U.add(1)), of(1));
      return U.assertResolved(actual, 2);
    });

    it('rejects if one of the two reject', function (){
      var left = ap(reject('err'), of(U.add(1)));
      var right = ap(of(U.add(1)), reject('err'));
      return Promise.all([
        U.assertRejected(left, 'err'),
        U.assertRejected(right, 'err')
      ]);
    });

    it('does not matter if the left resolves late', function (){
      var actual = ap(of(U.add(1)), after(20, 1));
      return U.assertResolved(actual, 2);
    });

    it('does not matter if the right resolves late', function (){
      var actual = ap(after(20, U.add(1)), of(1));
      return U.assertResolved(actual, 2);
    });

    it('interprets in sequence', function (done){
      var running = true;
      var right = after(20, 1).map(function (x){ running = false; return x });
      var left = of(function (){ expect(running).to.equal(false); done() });
      ap(left, right)._interpret(done, U.noop, U.noop);
    });

    it('cancels the left Future if cancel is called while it is running', function (done){
      var left = of(U.add(1));
      var right = Future(function (){ return function (){ return done() } });
      var cancel = ap(left, right)._interpret(done, U.noop, U.noop);
      cancel();
    });

    it('cancels the right Future if cancel is called while it is running', function (done){
      var left = Future(function (){ return function (){ return done() } });
      var right = of(1);
      var cancel = ap(left, right)._interpret(done, U.noop, U.noop);
      cancel();
    });

  });

});
