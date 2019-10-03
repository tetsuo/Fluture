import {extractRight} from '../../index.js';
import {testFunction, futureArg} from '../util/props.js';
import {isArray, test} from '../util/util.js';
import {mock} from '../util/futures.js';

testFunction('extractRight', extractRight, [futureArg], isArray);

test('dispatches to #extractRight', function (done){
  var m = Object.create(mock);
  m.extractRight = done;
  extractRight(m);
});
