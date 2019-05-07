import show from 'sanctuary-show';
import {value} from '../../index.mjs';
import {testFunction, functionArg, resolvedFutureArg} from '../util/props';
import {eq, isFunction, noop, itRaises, error} from '../util/util';
import {crashed, rejected, resolved} from '../util/futures';

describe('value()', function (){
  testFunction('value', value, [functionArg, resolvedFutureArg], isFunction);

  itRaises('when the Future crashes', function (){
    value(noop)(rejected);
  }, new Error(
    'Future#value was called on a rejected Future\n' +
    '  Rejection: "rejected"\n' +
    '  Future: ' + show(rejected)
  ));

  itRaises('when the Future rejects', function (){
    value(noop)(crashed);
  }, error);

  it('calls the continuation with the resolution value', function (done){
    value(function (x){
      eq(x, 'resolved');
      done();
    })(resolved);
  });

});
