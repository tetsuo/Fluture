import {application1, application, func, bifunctor} from './internal/check';
import {FL} from './internal/const';
import {createTransformation} from './internal/transformation';
import {call} from './internal/utils';
import {isFuture} from './future';
import {Reject} from './reject';
import {Resolve} from './resolve';

export var BimapTransformation = createTransformation(2, 'bimap', {
  rejected: function BimapTransformation$rejected(x){
    return new Reject(this.context, call(this.$1, x));
  },
  resolved: function BimapTransformation$resolved(x){
    return new Resolve(this.context, call(this.$2, x));
  }
});

export function bimap(f){
  var context1 = application1(bimap, func, f);
  return function bimap(g){
    var context2 = application(2, bimap, func, g, context1);
    return function bimap(m){
      var context3 = application(3, bimap, bifunctor, m, context2);
      return isFuture(m) ?
             m._transform(new BimapTransformation(context3, f, g)) :
             m[FL.bimap](f, g);
    };
  };
}
