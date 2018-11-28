import {fold, of, reject} from '../index.mjs';
import * as U from './util';
import {testFunction, functionArg, futureArg} from './props';

describe('fold()', function (){

  testFunction('fold', fold, [functionArg, functionArg, futureArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('resolves with the transformed rejection value', function (){
      return U.assertResolved(fold(U.add(1), U.sub(1), reject(1)), 2);
    });

    it('resolves with the transformed resolution value', function (){
      return U.assertResolved(fold(U.sub(1), U.add(1), of(1)), 2);
    });

  });

});
