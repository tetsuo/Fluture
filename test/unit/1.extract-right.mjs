import {extractRight} from '../../index.mjs';
import {testFunction, futureArg} from '../util/props';
import {isArray} from '../util/util';
import {mock} from '../util/futures';

describe('extractRight()', function (){
  testFunction('extractRight', extractRight, [futureArg], isArray);

  it('dispatches to #extractRight', function (done){
    var m = Object.create(mock);
    m.extractRight = done;
    extractRight(m);
  });
});
