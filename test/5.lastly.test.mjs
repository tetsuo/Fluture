import {lastly, of, reject, finally as fin} from '../index.mjs';
import * as U from './util';
import * as F from './futures';
import {testFunction, futureArg} from './props';

describe('lastly()', function (){

  testFunction('lastly', lastly, [futureArg, futureArg], U.assertValidFuture);

  it('is an alias of "finally"', function (){
    U.eq(lastly, fin);
  });

  describe('#_interpret()', function (){

    it('runs the second Future when the first resolves', function (done){
      lastly(of(null).map(done), of(1))._interpret(done, U.noop, U.noop);
    });

    it('runs the second Future when the first rejects', function (done){
      lastly(of(null).map(done), reject(1))._interpret(done, U.noop, U.noop);
    });

    it('resolves with the resolution value of the first', function (){
      var actual = lastly(of(2), of(1));
      return U.assertResolved(actual, 1);
    });

    it('rejects with the rejection reason of the first if the second resolves', function (){
      var actual = lastly(of(2), reject(1));
      return U.assertRejected(actual, 1);
    });

    it('always rejects with the rejection reason of the second', function (){
      var actualResolved = lastly(reject(2), of(1));
      var actualRejected = lastly(reject(2), reject(1));
      return Promise.all([
        U.assertRejected(actualResolved, 2),
        U.assertRejected(actualRejected, 2)
      ]);
    });

    it('does nothing after being cancelled', function (done){
      lastly(F.resolved, F.resolvedSlow)._interpret(done, U.failRej, U.failRes)();
      lastly(F.resolvedSlow, F.resolved)._interpret(done, U.failRej, U.failRes)();
      lastly(F.rejected, F.rejectedSlow)._interpret(done, U.failRej, U.failRes)();
      lastly(F.rejectedSlow, F.rejected)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

  });

});
