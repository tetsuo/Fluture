import {application1, application, future} from './internal/check';
import {
  createParallelTransformation,
  earlyCrash,
  earlyReject
} from './internal/parallel-transformation';
import {createTransformation} from './internal/transformation';
import {noop} from './internal/utils';
import {Resolve} from './resolve';

export var PairTransformation = createTransformation(1, 'pair', {
  resolved: function PairTransformation$resolved(x){
    return new Resolve(this.context, [x, this.$1]);
  }
});

export var BothTransformation =
createParallelTransformation('both', earlyCrash, earlyReject, noop, {
  resolved: function BothTransformation$resolved(x){
    return this.$1._transform(new PairTransformation(this.context, x));
  }
});

export function both(left){
  var context1 = application1(both, future, left);
  return function both(right){
    var context2 = application(2, both, future, right, context1);
    return right._transform(new BothTransformation(context2, left));
  };
}
