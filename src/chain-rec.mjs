import {Next, Done} from './internal/iteration';
import {nil} from './internal/list';
import {ChainTransformation} from './chain';
import {resolve} from './resolve';

//Note: This function is not curried because it's only used to satisfy the
//      Fantasy Land ChainRec specification.
export function chainRec(step, init){
  return resolve(Next(init))._transform(new ChainTransformation(nil, function chainRec$recur(o){
    return o.done ?
           resolve(o.value) :
           step(Next, Done, o.value)._transform(new ChainTransformation(nil, chainRec$recur));
  }));
}
