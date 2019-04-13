import {reject} from '../../';
import {eq, assertValidFuture, assertRejected} from '../util/util';
import {testFunction, anyArg} from '../util/props';

describe('reject()', function (){

  testFunction('reject', reject, [anyArg], assertValidFuture);

  it('returns a rejected Future', function (){
    return assertRejected(reject(1), 1);
  });

  it('provides its reason to extractLeft()', function (){
    eq(reject(1).extractLeft(), [1]);
  });

  it('can be shown as string', function (){
    eq(reject(1).toString(), 'reject (1)');
  });

});
