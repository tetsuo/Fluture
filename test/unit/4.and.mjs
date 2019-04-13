import {Future, and} from '../../index.mjs';
import {assertCrashed, eq, assertValidFuture, noop, assertResolved, assertRejected, error} from '../util/util';
import {crashed, rejected, resolved, rejectedSlow, resolvedSlow} from '../util/futures';
import {testFunction, futureArg} from '../util/props';

describe('and()', function (){

  testFunction('and', and, [futureArg, futureArg], assertValidFuture);

  it('chooses the rejected over the resolved Future', function (){
    return Promise.all([
      assertResolved(and(resolved)(resolved), 'resolved'),
      assertRejected(and(rejected)(resolved), 'rejected'),
      assertRejected(and(resolved)(rejected), 'rejected'),
      assertRejected(and(rejected)(rejected), 'rejected'),
      assertResolved(and(resolved)(resolvedSlow), 'resolved'),
      assertResolved(and(resolvedSlow)(resolved), 'resolvedSlow'),
      assertRejected(and(rejected)(rejectedSlow), 'rejectedSlow'),
      assertRejected(and(rejectedSlow)(rejected), 'rejected'),
      assertCrashed(and(resolved)(crashed), error),
      assertCrashed(and(rejected)(crashed), error),
      assertCrashed(and(crashed)(resolved), error),
    ]);
  });

  it('cancels the running Future', function (done){
    var m = Future(function (){ return function (){ return done() } });
    var cancel = and(m)(m)._interpret(done, noop, noop);
    cancel();
  });

  it('displays correctly as string', function (){
    eq(and(rejected)(resolved).toString(), 'and (reject ("rejected")) (resolve ("resolved"))');
  });

});

