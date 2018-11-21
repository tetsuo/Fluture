import {forkCatch} from '../index.mjs';
import {testFunction, functionArg, futureArg} from './props';
import {eq, isFunction} from './util';
import {mock} from './futures';

describe('forkCatch()', function (){
  testFunction('forkCatch', forkCatch, [functionArg, functionArg, functionArg, futureArg], isFunction);

  it('dispatches to #_interpret()', function (){
    var a = function (){};
    var b = function (){};
    var c = function (){};
    var d = function (){};
    var m = Object.create(mock);

    m._interpret = function (rec, rej, res){
      eq(rec, a);
      eq(rej, b);
      eq(res, c);
      return d;
    };

    eq(forkCatch(a, b, c, m), d);
  });
});
