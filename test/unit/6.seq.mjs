import {seq} from '../../index.mjs';
import {testFunction, parallelArg} from '../util/props';
import {assertValidFuture} from '../util/util';

describe('seq()', function (){

  testFunction('seq', seq, [parallelArg], assertValidFuture);

});
