import {promise} from '../../index.mjs';
import {testFunction, futureArg} from '../util/props';
import {noop, isThenable, eq, itRaises, error} from '../util/util';
import {crashed, rejected, resolved} from '../util/futures';

describe('promise()', function (){

  before('setup global promise handler', function (){
    process.addListener('unhandledRejection', noop);
  });

  after('remove global promise handler', function (){
    process.removeListener('unhandledRejection', noop);
  });

  testFunction('promise', promise, [futureArg], isThenable);

  it('returns a Promise', function (){
    var actual = promise(resolved);
    eq(actual instanceof Promise, true);
  });

  itRaises('if the Future crashes', function (){
    promise(crashed);
  }, error);

  it('resolves if the Future resolves', function (done){
    promise(resolved).then(
      function (x){ eq(x, 'resolved'); done() },
      done
    );
  });

  it('rejects if the Future rejects', function (done){
    promise(rejected).then(
      function (){ return done(new Error('It resolved')) },
      function (x){ return (eq(x, 'rejected'), done()) }
    );
  });

});
