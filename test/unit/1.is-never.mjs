import {isNever, never} from '../../index.mjs';
import {any, property} from '../util/props';
import {eq} from '../util/util';

describe('isNever()', function (){
  it('returns true about never', function (){
    eq(isNever(never), true);
  });

  property('returns false about everything else', any, function (value){
    return isNever(value) === false;
  });
});
