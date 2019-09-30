import {coalesce} from '../../index.mjs';
import {test, assertCrashed, assertResolved, assertValidFuture, bang, B, throwing, error, eq} from '../util/util.mjs';
import {resolved, rejected} from '../util/futures.mjs';
import {testFunction, functionArg, futureArg} from '../util/props.mjs';

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
