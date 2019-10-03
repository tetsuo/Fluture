import {coalesce} from '../../index.js';
import {test, assertCrashed, assertResolved, assertValidFuture, bang, B, throwing, error, eq} from '../util/util.js';
import {resolved, rejected} from '../util/futures.js';
import {testFunction, functionArg, futureArg} from '../util/props.js';

testFunction('coalesce', coalesce, [functionArg, functionArg, futureArg], assertValidFuture);

test('joins the rejection and resolution values into the resolution branch', function (){
  return Promise.all([
    assertResolved(coalesce(bang)(B(bang)(bang))(rejected), 'rejected!'),
    assertResolved(coalesce(bang)(B(bang)(bang))(resolved), 'resolved!!'),
    assertCrashed(coalesce(throwing)(B)(rejected), error),
    assertCrashed(coalesce(B)(throwing)(resolved), error),
  ]);
});

test('displays correctly as string', function (){
  eq(coalesce(bang)(B)(resolved).toString(), 'coalesce (' + bang.toString() + ') (' + B.toString() + ') (resolve ("resolved"))');
});
