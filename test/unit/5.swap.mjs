import {swap, of, reject} from '../../index.mjs';
import * as U from '../util/util';
import {testFunction, futureArg} from '../util/props';

describe('swap()', function (){

  testFunction('swap', swap, [futureArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('rejects with the resolution value', function (){
      var actual = swap(of(1));
      return U.assertRejected(actual, 1);
    });

    it('resolves with the rejection reason', function (){
      var actual = swap(reject(1));
      return U.assertResolved(actual, 1);
    });

  });

});
