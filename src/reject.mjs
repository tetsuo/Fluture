import {application1, any} from './internal/check';
import {noop} from './internal/utils';
import {createInterpreter} from './future';

export var Reject = createInterpreter(1, 'reject', function Reject$interpret(rec, rej){
  rej(this.$1);
  return noop;
});

Reject.prototype.extractLeft = function Reject$extractLeft(){
  return [this.$1];
};

export function reject(x){
  return new Reject(application1(reject, any, x), x);
}
