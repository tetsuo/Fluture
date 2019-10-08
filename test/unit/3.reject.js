import {reject} from '../../index.js';
import {eq, assertValidFuture, assertRejected, test} from '../util/util.js';
import {testFunction, anyArg} from '../util/props.js';

testFunction('reject', reject, [anyArg], assertValidFuture);

test('returns a rejected Future', function (){
  return assertRejected(reject(1), 1);
});

test('provides its reason to extractLeft()', function (){
  eq(reject(1).extractLeft(), [1]);
});

test('can be shown as string', function (){
  eq(reject(1).toString(), 'reject (1)');
});
