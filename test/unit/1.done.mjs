import {done} from '../../index.mjs';
import {testFunction, functionArg, futureArg} from '../util/props';
import {eq, isFunction} from '../util/util';
import {mock} from '../util/futures';

describe('done()', function (){
  testFunction('done', done, [functionArg, futureArg], isFunction);

  it('dispatches to #done()', function (fin){
    var a = function (){};
    var m = Object.create(mock);

    m.done = function (x){
      eq(x, a);
      fin();
    };

    done(a, m);
  });
});
