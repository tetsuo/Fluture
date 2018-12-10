import {promise} from '../../index.mjs';
import {testFunction, futureArg} from '../util/props';
import {noop, isThenable} from '../util/util';
import {mock} from '../util/futures';

describe('promise()', function (){

  before('setup global promise handler', function (){
    process.addListener('unhandledRejection', noop);
  });

  after('remove global promise handler', function (){
    process.removeListener('unhandledRejection', noop);
  });

  testFunction('promise', promise, [futureArg], isThenable);

  it('dispatches to #promise', function (done){
    var m = Object.create(mock);
    m.promise = done;
    promise(m);
  });
});
