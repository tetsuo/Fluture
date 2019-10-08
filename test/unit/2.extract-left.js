import {extractLeft} from '../../index.js';
import {testFunction, futureArg} from '../util/props.js';
import {isArray, test} from '../util/util.js';
import {mock} from '../util/futures.js';

testFunction('extractLeft', extractLeft, [futureArg], isArray);

test('dispatches to #extractLeft', function (done){
  var m = Object.create(mock);
  m.extractLeft = done;
  extractLeft(m);
});
