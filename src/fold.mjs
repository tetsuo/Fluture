import {application1, application, func, future} from './internal/check';
import {createTransformation} from './internal/transformation';
import {call} from './internal/utils';
import {Resolve} from './resolve';

export var FoldTransformation = createTransformation(2, 'fold', {
  rejected: function FoldTransformation$rejected(x){
    return new Resolve(this.context, call(this.$1, x));
  },
  resolved: function FoldTransformation$resolved(x){
    return new Resolve(this.context, call(this.$2, x));
  }
});

export function fold(f){
  var context1 = application1(fold, func, f);
  return function fold(g){
    var context2 = application(2, fold, func, g, context1);
    return function fold(m){
      var context3 = application(3, fold, future, m, context2);
      return m._transform(new FoldTransformation(context3, f, g));
    };
  };
}
