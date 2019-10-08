import show from 'sanctuary-show';
import {value} from '../../index.js';
import {testFunction, functionArg, resolvedFutureArg} from '../util/props.js';
import {eq, isFunction, noop, itRaises, error, test} from '../util/util.js';
import {crashed, rejected, resolved} from '../util/futures.js';

testFunction('value', value, [functionArg, resolvedFutureArg], isFunction);

itRaises('when the Future crashes', function (){
  value(noop)(rejected);
}, error);

itRaises('when the Future rejects', function (){
  value(noop)(crashed);
}, new Error(
  'Future#value was called on a rejected Future\n' +
  '  Rejection: "rejected"\n' +
  '  Future: ' + show(rejected)
));

test('calls the continuation with the resolution value', function (done){
  value(function (x){
    eq(x, 'resolved');
    done();
  })(resolved);
});
