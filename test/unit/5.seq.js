import {seq} from '../../index.js';
import {testFunction, parallelArg} from '../util/props.js';
import {assertValidFuture} from '../util/util.js';

testFunction('seq', seq, [parallelArg], assertValidFuture);
