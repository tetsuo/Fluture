import {application1, application, future, apply as applyArg} from './internal/check';
import {FL} from './internal/const';
import {typeError} from './internal/error';
import {isFunction} from './internal/predicates';
import {createTransformation} from './internal/transformation';
import {show} from './internal/utils';
import {isFuture} from './future';
import {MapTransformation} from './map';

export var ApTransformation = createTransformation(1, 'ap', {
  resolved: function ApTransformation$resolved(f){
    if(isFunction(f)) return this.$1._transform(new MapTransformation(this.context, f));
    throw typeError(
      'ap expects the second Future to resolve to a Function\n' +
      '  Actual: ' + show(f)
    );
  }
});

export function ap(mx){
  if(isFuture(mx)){
    var context1 = application1(ap, future, arguments);
    return function ap(mf){
      var context2 = application(2, ap, future, arguments, context1);
      return mf._transform(new ApTransformation(context2, mx));
    };
  }

  var context = application1(ap, applyArg, arguments);
  return function ap(mf){
    application(2, ap, applyArg, arguments, context);
    return mx[FL.ap](mf);
  };
}
