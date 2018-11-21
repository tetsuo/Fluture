import {Future, race} from '../index.mjs';
import * as U from './util';
import * as F from './futures';
import {testFunction, futureArg} from './props';

describe('race()', function (){

  testFunction('race', race, [futureArg, futureArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    describe('(Crashed, Resolved)', function (){

      it('crashes if left settles first', function (){
        return U.assertCrashed(race(F.crashed, F.resolvedSlow), U.error);
      });

      it('resolves if left settles last', function (){
        return U.assertResolved(race(F.crashedSlow, F.resolved), 'resolved');
      });

    });

    describe('(Crashed, Rejected)', function (){

      it('crashes if left settles first', function (){
        return U.assertCrashed(race(F.crashed, F.rejectedSlow), U.error);
      });

      it('rejects if left settles last', function (){
        return U.assertRejected(race(F.crashedSlow, F.rejected), 'rejected');
      });

    });

    describe('(Resolved, Crashed)', function (){

      it('resolves if left settles first', function (){
        return U.assertResolved(race(F.resolved, F.crashedSlow), 'resolved');
      });

      it('crashes if left settles last', function (){
        return U.assertCrashed(race(F.resolvedSlow, F.crashed), U.error);
      });

    });

    describe('(Rejected, Crashed)', function (){

      it('rejects if left settles first', function (){
        return U.assertRejected(race(F.rejected, F.crashedSlow), 'rejected');
      });

      it('crashes if left settles last', function (){
        return U.assertCrashed(race(F.rejectedSlow, F.crashed), U.error);
      });

    });

    describe('(Resolved, Resolved)', function (){

      it('resolves with left if left settles first', function (){
        return U.assertResolved(race(F.resolved, F.resolvedSlow), 'resolved');
      });

      it('resolves with right if left settles last', function (){
        return U.assertResolved(race(F.resolvedSlow, F.resolved), 'resolved');
      });

    });

    describe('(Rejected, Rejected)', function (){

      it('rejects with right if right rejects first', function (){
        return U.assertRejected(race(F.rejectedSlow, F.rejected), 'rejected');
      });

      it('rejects with left if right rejects last', function (){
        return U.assertRejected(race(F.rejected, F.rejectedSlow), 'rejected');
      });

    });

    describe('(Rejected, Resolved)', function (){

      it('resolves with right if right settles first', function (){
        return U.assertResolved(race(F.rejectedSlow, F.resolved), 'resolved');
      });

      it('rejects with left if right settles last', function (){
        return U.assertRejected(race(F.rejected, F.resolvedSlow), 'rejected');
      });

    });

    describe('(Resolved, Rejected)', function (){

      it('resolves with left if left settles first', function (){
        return U.assertResolved(race(F.resolved, F.rejectedSlow), 'resolved');
      });

      it('rejects with right if left settles last', function (){
        return U.assertRejected(race(F.resolvedSlow, F.rejected), 'rejected');
      });

    });

    it('rejects when the first one rejects', function (){
      var m1 = Future(function (rej, res){ return void setTimeout(res, 50, 1) });
      var m2 = Future(function (rej){ return void setTimeout(rej, 5, U.error) });
      return U.assertRejected(race(m1, m2), U.error);
    });

    it('resolves when the first one resolves', function (){
      var m1 = Future(function (rej, res){ return void setTimeout(res, 5, 1) });
      var m2 = Future(function (rej){ return void setTimeout(rej, 50, U.error) });
      return U.assertResolved(race(m1, m2), 1);
    });

    it('cancels the right if the left resolves', function (done){
      var m = race(F.resolvedSlow, Future(function (){ return function (){ return done() } }));
      m._interpret(done, U.noop, U.noop);
    });

    it('cancels the left if the right resolves', function (done){
      var m = race(Future(function (){ return function (){ return done() } }), F.resolvedSlow);
      m._interpret(done, U.noop, U.noop);
    });

    it('cancels the right if the left rejects', function (done){
      var m = race(F.rejectedSlow, Future(function (){ return function (){ return done() } }));
      m._interpret(done, U.noop, U.noop);
    });

    it('cancels the left if the right rejects', function (done){
      var m = race(Future(function (){ return function (){ return done() } }), F.rejectedSlow);
      m._interpret(done, U.noop, U.noop);
    });

    it('creates a cancel function which cancels both Futures', function (done){
      var cancelled = false;
      var m = Future(function (){ return function (){ return (cancelled ? done() : (cancelled = true)) } });
      var cancel = race(m, m)._interpret(done, U.noop, U.noop);
      cancel();
    });

  });

});
