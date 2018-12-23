import {assertEqual as eq, I, B, K} from '../util/util';
import {
  any,
  anyFuture,
  anyRejectedFuture,
  anyResolvedFuture,
  constant,
  f,
  g,
  oneof,
  property,
} from '../util/props';
import {
  Future,
  after,
  and,
  bimap,
  chain,
  chainRej,
  fold,
  go,
  map,
  mapRej,
  reject,
  rejectAfter,
  resolve,
  swap,
} from '../../';

var make = oneof(constant(resolve), constant(reject));

describe('Prop', function (){

  property('Rejected m => swap(m) = chainRej(resolve, m)', anyRejectedFuture, function (m){
    return eq(swap(m), chainRej(resolve, m));
  });

  property('Resolved m => swap(m) = chain(reject, m)', anyResolvedFuture, function (m){
    return eq(swap(m), chain(reject, m));
  });

  property('reject(x) = swap(Future.of(x))', any, function (x){
    return eq(reject(x), swap(Future.of(x)));
  });

  property('swap(reject(x)) = Future.of(x)', any, function (x){
    return eq(swap(reject(x)), Future.of(x));
  });

  property('Resolved m => chainRej(B(mk)(f), m) = m', make, anyResolvedFuture, function (mk, m){
    return eq(chainRej(B(mk)(f), m), m);
  });

  property('Rejected m => chainRej(B(mk)(f), m) = swap(chain(B(mk)(f), swap(m)))', make, anyRejectedFuture, function (mk, m){
    return eq(chainRej(B(mk)(f), m), chain(B(mk)(f), swap(m)));
  });

  property('after(1, x) = Future.of(x)', any, function (n, x){
    return eq(after(1, x), Future.of(x));
  });

  property('and(a, b) = chain(K(b), a)', anyFuture, anyFuture, function (a, b){
    return eq(and(a, b), chain(K(b), a));
  });

  property('Rejected m => fold(f, g, m) = chainRej(B(Future.of)(f), m)', anyRejectedFuture, function (m){
    return eq(fold(f, g, m), chainRej(B(Future.of)(f), m));
  });

  property('Resolved m => fold(f, g, m) = map(g, m)', anyResolvedFuture, function (m){
    return eq(fold(f, g, m), map(g, m));
  });

  property('go(function*(){ return f(yield m) }) = map(f, m)', anyFuture, function (m){
    return eq(go(function*(){ return f(yield m) }), map(f, m));
  });

  property('mapRej(f, m) = chainRej(B(reject)(f), m)', anyFuture, function (m){
    return eq(mapRej(f, m), chainRej(B(reject)(f), m));
  });

  property('mapRej(f, m) = bimap(f, I, m)', anyFuture, function (m){
    return eq(mapRej(f, m), bimap(f, I, m));
  });

  property('resolve(x) = Future.of(x)', any, function (x){
    return eq(resolve(x), Future.of(x));
  });

  property('rejectAfter(1, x) = reject(x)', any, function (n, x){
    return eq(rejectAfter(1, x), reject(x));
  });

});
