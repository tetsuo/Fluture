import chai from 'chai';
import {chainRej, of} from '../index.mjs';
import * as U from './util';
import * as F from './futures';
import {testFunction, functionArg, futureArg} from './props';

var expect = chai.expect;

describe('chainRej()', function (){

  testFunction('chainRej', chainRej, [functionArg, futureArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('crashes when the given function does not return Future', function (){
      var m = chainRej(function (){ return null }, F.rejected);
      return U.assertCrashed(m, new TypeError(
        'Future#chainRej() expects the function it\'s given to return a Future.\n' +
        '  Actual: null :: Null\n' +
        '  From calling: function (){ return null }\n' +
        '  With: "rejected"'
      ));
    });

    it('calls the given function with the inner of the Future', function (done){
      chainRej(function (x){
        expect(x).to.equal('rejected');
        done();
        return of(null);
      }, F.rejected)._interpret(done, U.noop, U.noop);
    });

    it('returns a Future with an inner equal to the returned Future', function (){
      var actual = chainRej(function (){ return F.resolved }, F.rejected);
      return U.assertResolved(actual, 'resolved');
    });

    it('maintains resolved state', function (){
      var actual = chainRej(function (){ return F.resolvedSlow }, F.resolved);
      return U.assertResolved(actual, 'resolved');
    });

    it('assumes rejected state', function (){
      var actual = chainRej(function (){ return F.rejectedSlow }, F.rejected);
      return U.assertRejected(actual, 'rejectedSlow');
    });

    it('does not chain after being cancelled', function (done){
      chainRej(U.failRej, F.rejectedSlow)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

  });

});
