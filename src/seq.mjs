import {invalidArgumentOf} from './internal/error';
import {application1} from './future';
import {isParallel} from './par';

var parallel = {pred: isParallel, error: invalidArgumentOf('be a ConcurrentFuture')};

export function seq(par){
  application1(seq, parallel, arguments);
  return par.sequential;
}
