import {isFuture} from '../../index.js';
import {property, anyFuture, anyNonFuture} from '../util/props.js';

property('returns true about Futures', anyFuture, function (value){
  return isFuture(value) === true;
});

property('returns false about everything else', anyNonFuture, function (value){
  return isFuture(value) === false;
});
