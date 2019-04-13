import {application1, future} from './internal/check';
import {createTransformation} from './internal/transformation';
import {reject} from './reject';
import {resolve} from './resolve';

export var SwapTransformation = createTransformation(0, 'swap', {
  resolved: reject,
  rejected: resolve
});

export function swap(m){
  var context = application1(swap, future, m);
  return m._transform(new SwapTransformation(context));
}
