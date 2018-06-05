import {expect} from 'chai';
import {Future, of} from '../index.mjs.js';
import * as U from './util';
import * as F from './futures';
import type from 'sanctuary-type-identifiers';

var testInstance = function (pap){

  it('is considered a member of fluture/Fluture', function (){
    expect(type(pap(of(1), of(U.add(1))))).to.equal(Future['@@type']);
  });

  describe('#_interpret()', function (){

    var mapf = function (m){ return m.map(function (x){ return function (y){ return [x, y] } }) };

    describe('(Crashed, Resolved)', function (){

      it('crashes if left settles first', function (){
        return U.assertCrashed(pap(F.crashed, mapf(F.resolvedSlow)), new Error(
          'Error came up while interpreting a Future:\n' +
          '  Intentional error for unit testing\n\n' +
          '  In: Future.after(20, "resolvedSlow")' +
          '.map(function (x){ return function (y){ return [x, y] } })' +
          '._parallelAp(Future(function(){ throw new Error("Intentional error for unit testing") }))\n'
        ));
      });

      it('crashes if left settles last', function (){
        return U.assertCrashed(pap(F.crashedSlow, mapf(F.resolved)), new Error(
          'Error came up while interpreting a Future:\n' +
          '  Intentional error for unit testing\n\n' +
          '  In: Future.of("resolved")' +
          '.map(function (x){ return function (y){ return [x, y] } })' +
          '._parallelAp(Future.after(20, null).and(Future(function(){ throw new Error("Intentional error for unit testing") })))\n'
        ));
      });

    });

    describe('(Crashed, Rejected)', function (){

      it('crashes if left settles first', function (){
        return U.assertCrashed(pap(F.crashed, mapf(F.rejectedSlow)), new Error(
          'Error came up while interpreting a Future:\n' +
          '  Intentional error for unit testing\n\n' +
          '  In: Future.rejectAfter(20, "rejectedSlow")' +
          '.map(function (x){ return function (y){ return [x, y] } })' +
          '._parallelAp(Future(function(){ throw new Error("Intentional error for unit testing") }))\n'
        ));
      });

      it('rejects if left settles last', function (){
        return U.assertRejected(pap(F.crashedSlow, mapf(F.rejected)), 'rejected');
      });

    });

    describe('(Resolved, Crashed)', function (){

      it('crashes if left settles first', function (){
        return U.assertCrashed(pap(F.resolved, mapf(F.crashedSlow)), new Error(
          'Error came up while interpreting a Future:\n' +
          '  Intentional error for unit testing\n\n' +
          '  In: Future.after(20, null)' +
          '.and(Future(function(){ throw new Error("Intentional error for unit testing") }))' +
          '.map(function (x){ return function (y){ return [x, y] } })' +
          '._parallelAp(Future.of("resolved"))\n'
        ));
      });

      it('crashes if left settles last', function (){
        return U.assertCrashed(pap(F.resolvedSlow, mapf(F.crashed)), new Error(
          'Intentional error for unit testing'
        ));
      });

    });

    describe('(Rejected, Crashed)', function (){

      it('rejects if left settles first', function (){
        return U.assertRejected(pap(F.rejected, mapf(F.crashedSlow)), 'rejected');
      });

      it('crashes if left settles last', function (){
        return U.assertCrashed(pap(F.rejectedSlow, mapf(F.crashed)), new Error(
          'Intentional error for unit testing'
        ));
      });

    });

    describe('(Resolved, Resolved)', function (){

      it('resolves with pap if left settles first', function (){
        return U.assertResolved(pap(F.resolved, mapf(F.resolvedSlow)), ['resolvedSlow', 'resolved']);
      });

      it('resolves with pap if left settles last', function (){
        return U.assertResolved(pap(F.resolvedSlow, mapf(F.resolved)), ['resolved', 'resolvedSlow']);
      });

    });

    describe('(Rejected, Rejected)', function (){

      it('rejects with right if right rejects first', function (){
        return U.assertRejected(pap(F.rejectedSlow, mapf(F.rejected)), 'rejected');
      });

      it('rejects with left if right rejects last', function (){
        return U.assertRejected(pap(F.rejected, mapf(F.rejectedSlow)), 'rejected');
      });

    });

    describe('(Rejected, Resolved)', function (){

      it('rejects with left if right settles first', function (){
        return U.assertRejected(pap(F.rejectedSlow, mapf(F.resolved)), 'rejectedSlow');
      });

      it('rejects with left if right settles last', function (){
        return U.assertRejected(pap(F.rejected, mapf(F.resolvedSlow)), 'rejected');
      });

    });

    describe('(Resolved, Rejected)', function (){

      it('rejects with right if left settles first', function (){
        return U.assertRejected(pap(F.resolved, mapf(F.rejectedSlow)), 'rejectedSlow');
      });

      it('rejects with right if left settles last', function (){
        return U.assertRejected(pap(F.resolvedSlow, mapf(F.rejected)), 'rejected');
      });

    });

    it('crashes when the other does not resolve to a Function', function (){
      var m = pap(of(1), of(null));
      return U.assertCrashed(m, new Error(
        'TypeError came up while interpreting a Future:\n' +
        '  Future#ap expects its first argument to be a Future of a Function\n' +
        '    Actual: Future.of(null)\n\n' +
        '  In: Future.of(null)._parallelAp(Future.of(1))\n'
      ));
    });

    it('calls the function contained in the given Future to its contained value', function (){
      var actual = pap(of(1), of(U.add(1)));
      return U.assertResolved(actual, 2);
    });

  });

};

describe('Future#_parallelAp()', function (){

  testInstance(function (a, b){ return b._parallelAp(a) });

});
