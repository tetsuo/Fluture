import {application1, application, func, functor} from './internal/check';
import {FL} from './internal/const';
import {createTransformation} from './internal/transformation';
import {call} from './internal/utils';
import {isFuture} from './future';
import {resolve} from './resolve';

export var MapTransformation = createTransformation(1, 'map', {
  resolved: function MapTransformation$resolved(x){ return resolve(call(this.$1, x)) }
});

export function map(f){
  var context1 = application1(map, func, f);
  return function map(m){
    var context2 = application(2, map, functor, m, context1);
    return isFuture(m) ?
           m._transform(new MapTransformation(context2, f)) :
           m[FL.map](f);
  };
}
