import {fork} from '../index.mjs';
import {testFunction, functionArg, futureArg} from './props';
import {eq, isFunction} from './util';
import {mock} from './futures';

describe('fork()', function (){
  testFunction('fork', fork, [functionArg, functionArg, futureArg], isFunction);

  it('dispatches to #_interpret()', function (){
    var a = function (){};
    var b = function (){};
    var c = function (){};
    var m = Object.create(mock);

    m._interpret = function (rec, rej, res){
      eq(typeof rec, 'function');
      eq(rej, a);
      eq(res, b);
      return c;
    };

    eq(fork(a, b, m), c);
  });
});
