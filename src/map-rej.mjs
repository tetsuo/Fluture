import {application1, application, future, func} from './internal/check';
import {createTransformation} from './internal/transformation';
import {call} from './internal/utils';
import {reject} from './reject';

export var MapRejTransformation = createTransformation(1, 'mapRej', {
  rejected: function MapRejTransformation$rejected(x){ return reject(call(this.$1, x)) }
});

export function mapRej(f){
  var context1 = application1(mapRej, func, f);
  return function mapRej(m){
    var context2 = application(2, mapRej, future, m, context1);
    return m._transform(new MapRejTransformation(context2, f));
  };
}
