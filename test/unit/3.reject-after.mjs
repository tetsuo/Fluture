import chai from 'chai';
import {Future, rejectAfter, never} from '../../index.mjs';
import * as U from '../util/util';
import {testFunction, positiveIntegerArg, anyArg} from '../util/props';

var expect = chai.expect;

describe('rejectAfter()', function (){

  testFunction('rejectAfter', rejectAfter, [positiveIntegerArg, anyArg], U.assertValidFuture);

  it('returns Never when given Infinity', function (){
    expect(rejectAfter(Infinity, 1)).to.equal(never);
  });

  describe('#_interpret()', function (){

    it('calls failure callback with the reason', function (){
      return U.assertRejected(rejectAfter(20, 1), 1);
    });

    it('clears its internal timeout when cancelled', function (done){
      rejectAfter(20, 1)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

  });

  describe('#race()', function (){

    it('races undeterministic Futures the conventional way', function (){
      var m = rejectAfter(1, 1);
      var undeterministic = Future(function (){});
      var actual = m.race(undeterministic);
      expect(actual).to.not.equal(m);
      expect(actual).to.not.equal(undeterministic);
      return U.assertRejected(actual, 1);
    });

  });

  describe('#swap()', function (){

    it('returns a resolved Future', function (){
      var m = rejectAfter(10, 1);
      return U.assertResolved(m.swap(), 1);
    });

  });

  describe('#extractLeft()', function (){

    it('returns array with the reason', function (){
      expect(rejectAfter(20, 1).extractLeft()).to.deep.equal([1]);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the RejectAfter', function (){
      expect(rejectAfter(20, 1).toString()).to.equal('rejectAfter(20, 1)');
    });

  });

});
