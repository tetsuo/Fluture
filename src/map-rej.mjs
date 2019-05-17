import {application1, application, future, func} from './internal/check';
import {createTransformation} from './internal/transformation';
import {call} from './internal/utils';
import {Reject} from './reject';

export var MapRejTransformation = createTransformation(1, 'mapRej', {
  rejected: function MapRejTransformation$rejected(x){
    return new Reject(this.context, call(this.$1, x));
  }
});

export function mapRej(f){
  var context1 = application1(mapRej, func, arguments);
  return function mapRej(m){
    var context2 = application(2, mapRej, future, arguments, context1);
    return m._transform(new MapRejTransformation(context2, f));
  };
}
