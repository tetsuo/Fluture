import {reject, bimap, of} from '../index.mjs';
import * as U from './util';
import {testFunction, functionArg, bifunctorArg} from './props';

describe('bimap()', function (){

  testFunction('bimap', bimap, [functionArg, functionArg, bifunctorArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('applies the first function to the value in the rejection branch', function (){
      var actual = bimap(U.add(1), U.failRes, reject(1));
      return U.assertRejected(actual, 2);
    });

    it('applies the second function to the value in the resolution branch', function (){
      var actual = bimap(U.failRej, U.add(1), of(1));
      return U.assertResolved(actual, 2);
    });

  });

});
