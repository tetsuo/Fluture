import {value} from '../../index.mjs';
import {testFunction, functionArg, resolvedFutureArg} from '../util/props';
import {eq, isFunction} from '../util/util';
import {mock} from '../util/futures';

describe('value()', function (){
  testFunction('value', value, [functionArg, resolvedFutureArg], isFunction);

  it('dispatches to #value()', function (done){
    var a = function (){};
    var m = Object.create(mock);

    m.value = function (x){
      eq(x, a);
      done();
    };

    value(a, m);
  });
});
