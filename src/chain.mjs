import {application1, application, func, monad} from './internal/check';
import {FL} from './internal/const';
import {createTransformation} from './internal/transformation';
import {call} from './internal/utils';
import {isFuture} from './future';

export var ChainTransformation = createTransformation(1, 'chain', {
  resolved: function ChainTransformation$resolved(x){ return call(this.$1, x) }
});

export function chain(f){
  var context1 = application1(chain, func, f);
  return function chain(m){
    var context2 = application(2, chain, monad, m, context1);
    return isFuture(m) ?
           m._transform(new ChainTransformation(context2, f)) :
           m[FL.chain](f);
  };
}
