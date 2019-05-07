import {application, application1, func, future} from './internal/check';
import {raise} from './internal/utils';

export function fork(f){
  var context1 = application1(fork, func, f);
  return function fork(g){
    var context2 = application(2, fork, func, g, context1);
    return function fork(m){
      application(3, fork, future, m, context2);
      return m._interpret(raise, f, g);
    };
  };
}
