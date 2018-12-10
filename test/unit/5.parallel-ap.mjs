import Future from '../../index.cjs';
import {of} from '../../index.mjs';
import * as U from '../util/util';
import * as F from '../util/futures';

var parallelAp = function (a, b){ return b._parallelAp(a) };

describe('parallelAp()', function (){

  it('is not currently exposed as a static function', function (){
    U.eq(Future.parallelAp, undefined);
  });

  describe('#_interpret()', function (){

    var mapf = function (m){ return m.map(function (x){ return function (y){ return [x, y] } }) };

    describe('(Crashed, Resolved)', function (){

      it('crashes if left settles first', function (){
        return U.assertCrashed(parallelAp(F.crashed, mapf(F.resolvedSlow)), U.error);
      });

      it('crashes if left settles last', function (){
        return U.assertCrashed(parallelAp(F.crashedSlow, mapf(F.resolved)), U.error);
      });

    });

    describe('(Crashed, Rejected)', function (){

      it('crashes if left settles first', function (){
        return U.assertCrashed(parallelAp(F.crashed, mapf(F.rejectedSlow)), U.error);
      });

      it('rejects if left settles last', function (){
        return U.assertRejected(parallelAp(F.crashedSlow, mapf(F.rejected)), 'rejected');
      });

    });

    describe('(Resolved, Crashed)', function (){

      it('crashes if left settles first', function (){
        return U.assertCrashed(parallelAp(F.resolved, mapf(F.crashedSlow)), U.error);
      });

      it('crashes if left settles last', function (){
        return U.assertCrashed(parallelAp(F.resolvedSlow, mapf(F.crashed)), new Error(
          'Intentional error for unit testing'
        ));
      });

    });

    describe('(Rejected, Crashed)', function (){

      it('rejects if left settles first', function (){
        return U.assertRejected(parallelAp(F.rejected, mapf(F.crashedSlow)), 'rejected');
      });

      it('crashes if left settles last', function (){
        return U.assertCrashed(parallelAp(F.rejectedSlow, mapf(F.crashed)), new Error(
          'Intentional error for unit testing'
        ));
      });

    });

    describe('(Resolved, Resolved)', function (){

      it('resolves with parallelAp if left settles first', function (){
        return U.assertResolved(parallelAp(F.resolved, mapf(F.resolvedSlow)), ['resolvedSlow', 'resolved']);
      });

      it('resolves with parallelAp if left settles last', function (){
        return U.assertResolved(parallelAp(F.resolvedSlow, mapf(F.resolved)), ['resolved', 'resolvedSlow']);
      });

    });

    describe('(Rejected, Rejected)', function (){

      it('rejects with right if right rejects first', function (){
        return U.assertRejected(parallelAp(F.rejectedSlow, mapf(F.rejected)), 'rejected');
      });

      it('rejects with left if right rejects last', function (){
        return U.assertRejected(parallelAp(F.rejected, mapf(F.rejectedSlow)), 'rejected');
      });

    });

    describe('(Rejected, Resolved)', function (){

      it('rejects with left if right settles first', function (){
        return U.assertRejected(parallelAp(F.rejectedSlow, mapf(F.resolved)), 'rejectedSlow');
      });

      it('rejects with left if right settles last', function (){
        return U.assertRejected(parallelAp(F.rejected, mapf(F.resolvedSlow)), 'rejected');
      });

    });

    describe('(Resolved, Rejected)', function (){

      it('rejects with right if left settles first', function (){
        return U.assertRejected(parallelAp(F.resolved, mapf(F.rejectedSlow)), 'rejectedSlow');
      });

      it('rejects with right if left settles last', function (){
        return U.assertRejected(parallelAp(F.resolvedSlow, mapf(F.rejected)), 'rejected');
      });

    });

    it('crashes when the other does not resolve to a Function', function (){
      var m = parallelAp(of(1), of(null));
      return U.assertCrashed(m, new TypeError(
        'Future#_parallelAp() expects its first argument to be a Future of a Function\n' +
        '  Actual: Future.of(null)'
      ));
    });

    it('calls the function contained in the given Future to its contained value', function (){
      var actual = parallelAp(of(1), of(U.add(1)));
      return U.assertResolved(actual, 2);
    });

  });

});
