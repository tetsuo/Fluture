import {crash} from '../../src/future.js';
import {eq, assertIsFuture, assertCrashed, test} from '../util/util.js';
import {testFunction, anyArg} from '../util/props.js';

testFunction('crash', crash, [anyArg], assertIsFuture);

test('returns a crashed Future', function (){
  return assertCrashed(crash(1), 1);
});

test('can be shown as string', function (){
  eq(crash(1).toString(), 'crash (1)');
});
