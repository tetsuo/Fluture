import {application1, application, future} from './internal/check';
import {createTransformation} from './internal/transformation';

export var AndTransformation = createTransformation(1, 'and', {
  resolved: function AndTransformation$resolved(){ return this.$1 }
});

export function and(left){
  var context1 = application1(and, future, left);
  return function and(right){
    var context2 = application(2, and, future, right, context1);
    return right._transform(new AndTransformation(context2, left));
  };
}
