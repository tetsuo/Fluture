import {mapRej} from '../../index.mjs';
import * as U from '../util/util';
import * as F from '../util/futures';
import {testFunction, functionArg, futureArg} from '../util/props';

describe('mapRej()', function (){

  testFunction('mapRej', mapRej, [functionArg, futureArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('applies the given function to its rejection reason', function (){
      var actual = mapRej(U.bang, F.rejected);
      return U.assertRejected(actual, 'rejected!');
    });

    it('does not map resolved state', function (){
      var actual = mapRej(function (){ return 'mapped' }, F.resolved);
      return U.assertResolved(actual, 'resolved');
    });

    it('does not resolve after being cancelled', function (done){
      mapRej(U.failRej, F.resolvedSlow)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

    it('does not reject after being cancelled', function (done){
      mapRej(U.failRej, F.rejectedSlow)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

  });

});
