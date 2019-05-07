import {application1, application, func, future} from './internal/check';
import {raise} from './internal/utils';

export function done(callback){
  var context1 = application1(done, func, callback);
  function done$res(x){
    callback(null, x);
  }
  return function done(m){
    var context2 = application(2, done, future, m, context1);
    return m._interpret(raise, callback, done$res, context2);
  };
}
