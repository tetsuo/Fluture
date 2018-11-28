import {alt, isParallel} from '../index.mjs';
import {testFunction, altArg} from './props';

describe('alt()', function (){

  testFunction('alt', alt, [altArg, altArg], isParallel);

});
