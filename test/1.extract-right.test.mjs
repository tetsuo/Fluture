import {extractRight} from '../index.mjs';
import {testFunction, futureArg} from './props';
import {isArray} from './util';
import {mock} from './futures';

describe('extractRight()', function (){
  testFunction('extractRight', extractRight, [futureArg], isArray);

  it('dispatches to #extractRight', function (done){
    var m = Object.create(mock);
    m.extractRight = done;
    extractRight(m);
  });
});
