import {seq} from '../index.mjs';
import {testFunction, parallelArg} from './props';
import {assertValidFuture} from './util';

describe('seq()', function (){

  testFunction('seq', seq, [parallelArg], assertValidFuture);

});
