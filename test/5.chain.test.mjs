import chai from 'chai';
import {chain, of} from '../index.mjs';
import * as U from './util';
import * as F from './futures';
import {testFunction, functionArg, chainArg} from './props';

var expect = chai.expect;

describe('chain()', function (){

  testFunction('chain', chain, [functionArg, chainArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('throws TypeError when the given function does not return Future', function (){
      var m = chain(function (){ return null }, F.resolved);
      return U.assertCrashed(m, new TypeError(
        'Future#chain() expects the function it\'s given to return a Future.\n' +
        '  Actual: null :: Null\n' +
        '  From calling: function (){ return null }\n' +
        '  With: "resolved"'
      ));
    });

    it('calls the given function with the inner of the Future', function (done){
      chain(function (x){
        expect(x).to.equal('resolved');
        done();
        return of(null);
      }, F.resolved)._interpret(done, U.noop, U.noop);
    });

    it('returns a Future with an inner equal to the returned Future', function (){
      var actual = chain(function (){ return F.resolvedSlow }, F.resolved);
      return U.assertResolved(actual, 'resolvedSlow');
    });

    it('maintains rejected state', function (){
      var actual = chain(function (){ return F.resolved }, F.rejected);
      return U.assertRejected(actual, 'rejected');
    });

    it('assumes rejected state', function (){
      var actual = chain(function (){ return F.rejected }, F.resolved);
      return U.assertRejected(actual, 'rejected');
    });

    it('does not chain after being cancelled', function (done){
      chain(U.failRes, F.resolvedSlow)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

    it('does not reject after being cancelled', function (done){
      chain(U.failRes, F.rejectedSlow)._interpret(done, U.failRej, U.failRes)();
      chain(function (){ return F.rejectedSlow }, F.resolved)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

  });

});
