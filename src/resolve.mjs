import {application1, any} from './internal/check';
import {noop} from './internal/utils';
import {createInterpreter} from './future';

export var Resolve = createInterpreter(1, 'resolve', function Resolve$interpret(rec, rej, res){
  res(this.$1);
  return noop;
});

Resolve.prototype.extractRight = function Resolve$extractRight(){
  return [this.$1];
};

export function resolve(x){
  return new Resolve(application1(resolve, any, x), x);
}
