import {application1, application, future} from './internal/check';
import {createTransformation} from './internal/transformation';
import {AndTransformation} from './and';
import {Reject} from './reject';
import {Resolve} from './resolve';

export var LastlyTransformation = createTransformation(1, 'lastly', {
  rejected: function FinallyAction$rejected(x){
    return this.$1._transform(new AndTransformation(this.context, new Reject(this.context, x)));
  },
  resolved: function FinallyAction$resolved(x){
    return this.$1._transform(new AndTransformation(this.context, new Resolve(this.context, x)));
  }
});

export function lastly(cleanup){
  var context1 = application1(lastly, future, cleanup);
  return function lastly(program){
    var context2 = application(2, lastly, future, program, context1);
    return program._transform(new LastlyTransformation(context2, cleanup));
  };
}
