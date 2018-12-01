import {map} from '../../index.mjs';
import * as U from '../util/util';
import * as F from '../util/futures';
import {testFunction, functionArg, functorArg} from '../util/props';

describe('map()', function (){

  testFunction('map', map, [functionArg, functorArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('applies the given function to its inner', function (){
      var actual = map(U.bang, F.resolved);
      return U.assertResolved(actual, 'resolved!');
    });

    it('does not map rejected state', function (){
      var actual = map(function (){ return 'mapped' }, F.rejected);
      return U.assertRejected(actual, 'rejected');
    });

    it('does not resolve after being cancelled', function (done){
      map(U.failRes, F.resolvedSlow)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

    it('does not reject after being cancelled', function (done){
      map(U.failRes, F.rejectedSlow)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

  });

});
