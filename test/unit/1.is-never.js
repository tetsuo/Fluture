import {isNever, never} from '../../index.js';
import {any, property} from '../util/props.js';
import {eq, test} from '../util/util.js';

test('returns true about never', function (){
  eq(isNever(never), true);
});

property('returns false about everything else', any, function (value){
  return isNever(value) === false;
});
