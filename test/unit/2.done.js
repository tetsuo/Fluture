import {done} from '../../index.js';
import {testFunction, functionArg, resolvedFutureArg} from '../util/props.js';
import {eq, isFunction, test} from '../util/util.js';
import {rejected, resolved} from '../util/futures.js';

testFunction('done', done, [functionArg, resolvedFutureArg], isFunction);

test('passes the rejection value as first parameter', function (testDone){
  done(function (x, y){
    eq(x, 'rejected');
    eq(y, undefined);
    testDone();
  })(rejected);
});

test('passes the resolution value as second parameter', function (testDone){
  done(function (x, y){
    eq(x, null);
    eq(y, 'resolved');
    testDone();
  })(resolved);
});
