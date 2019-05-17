import {application1, any} from './internal/check';
import {noop} from './internal/utils';
import {createInterpreter} from './future';

export var Crash = createInterpreter(1, 'crash', function Crash$interpret(rec){
  rec(this.$1);
  return noop;
});

export function crash(x){
  return new Crash(application1(crash, any, arguments), x);
}
