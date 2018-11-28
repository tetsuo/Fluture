import chai from 'chai';
import {Future, and, of} from '../index.mjs';
import * as U from './util';
import * as F from './futures';
import {testFunction, futureArg} from './props';

var expect = chai.expect;

describe('and()', function (){

  testFunction('and', and, [futureArg, futureArg], U.assertValidFuture);

  it('allows for the implementation of `all` in terms of reduce', function (){
    var all = function (ms){ return ms.reduce(and, of(true)) };
    return Promise.all([
      U.assertResolved(all([]), true),
      U.assertRejected(all([F.rejected, F.resolved]), 'rejected'),
      U.assertRejected(all([F.resolved, F.rejected]), 'rejected'),
      U.assertResolved(all([F.resolvedSlow, F.resolved]), 'resolved'),
      U.assertResolved(all([F.resolved, F.resolvedSlow]), 'resolvedSlow'),
      U.assertRejected(all([F.rejected, F.rejectedSlow]), 'rejected'),
      U.assertRejected(all([F.rejectedSlow, F.rejected]), 'rejectedSlow')
    ]);
  });

  describe('#_interpret()', function (){

    describe('(res, res)', function (){

      it('resolves with right if left resolves first', function (){
        return U.assertResolved(and(F.resolved, F.resolvedSlow), 'resolvedSlow');
      });

      it('resolves with right if left resolves last', function (){
        return U.assertResolved(and(F.resolvedSlow, F.resolved), 'resolved');
      });

    });

    describe('(rej, rej)', function (){

      it('rejects with left if right rejects first', function (){
        return U.assertRejected(and(F.rejectedSlow, F.rejected), 'rejectedSlow');
      });

      it('rejects with left if right rejects last', function (){
        return U.assertRejected(and(F.rejected, F.rejectedSlow), 'rejected');
      });

    });

    describe('(rej, res)', function (){

      it('rejects with left if right resolves first', function (){
        return U.assertRejected(and(F.rejectedSlow, F.resolved), 'rejectedSlow');
      });

      it('rejects with left if right resolves last', function (){
        return U.assertRejected(and(F.rejected, F.resolvedSlow), 'rejected');
      });

    });

    describe('(res, rej)', function (){

      it('rejects with right if left resolves first', function (){
        return U.assertRejected(and(F.resolved, F.rejectedSlow), 'rejectedSlow');
      });

      it('rejects with right if left resolves last', function (){
        return U.assertRejected(and(F.resolvedSlow, F.rejected), 'rejected');
      });

    });

    it('cancels the running Future', function (done){
      var m = Future(function (){ return function (){ return done() } });
      var cancel = and(m, m)._interpret(done, U.noop, U.noop);
      cancel();
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the data-structure', function (){
      var m = Future(function (){ return function (){} });
      var actual = and(m, m).toString();
      expect(actual).to.equal(((m.toString()) + '.and(' + (m.toString()) + ')'));
    });

  });

});
