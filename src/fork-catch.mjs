import {application, application1, func, future} from './internal/check';

export function forkCatch(f){
  var context1 = application1(forkCatch, func, f);
  return function forkCatch(g){
    var context2 = application(2, forkCatch, func, g, context1);
    return function forkCatch(h){
      var context3 = application(3, forkCatch, func, h, context2);
      return function forkCatch(m){
        var context4 = application(4, forkCatch, future, m, context3);
        return m._interpret(f, g, h, context4);
      };
    };
  };
}
