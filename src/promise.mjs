import {application1, future} from './internal/check';

export function promise(m){
  application1(promise, future, m);
  return new Promise(function promise$computation(res, rej){
    m._interpret(rej, rej, res);
  });
}
