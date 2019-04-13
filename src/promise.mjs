import {application1, future} from './internal/check';
import {raise} from './internal/utils';

export function promise(m){
  var context1 = application1(promise, future, m);
  return new Promise(function promise$computation(res, rej){
    m._interpret(raise, rej, res, context1);
  });
}
