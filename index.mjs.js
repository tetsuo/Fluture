import concurrify from 'concurrify';
import type from 'sanctuary-type-identifiers';
import {throwInvalidArgument} from './src/internal/throw';
import {Future, of, reject, never} from './src/core';
import {FL} from './src/internal/const';
import {chainRec} from './src/chain-rec';
import {ap, map, bimap, chain, race, alt} from './src/dispatchers';

Future.of = Future[FL.of] = of;
Future.chainRec = Future[FL.chainRec] = chainRec;
Future.reject = reject;
Future.ap = ap;
Future.map = map;
Future.bimap = bimap;
Future.chain = chain;

var Par = concurrify(Future, never, race, function parallelAp(a, b){ return b._parallelAp(a) });
Par.of = Par[FL.of];
Par.zero = Par[FL.zero];
Par.map = map;
Par.ap = ap;
Par.alt = alt;

function isParallel(x){
  return x instanceof Par || type(x) === Par['@@type'];
}

function seq(par){
  if(!isParallel(par)) throwInvalidArgument('Future.seq', 0, 'to be a Par', par);
  return par.sequential;
}

export {Future, Future as default, Par, isParallel, seq};
export {isFuture, reject, of, never, isNever} from './src/core';
export * from './src/dispatchers';
export {after, rejectAfter} from './src/after';
export {attempt, attempt as try} from './src/attempt';
export {cache} from './src/cache';
export {encase} from './src/encase';
export {encase2} from './src/encase2';
export {encase3} from './src/encase3';
export {encaseN} from './src/encase-n';
export {encaseN2} from './src/encase-n2';
export {encaseN3} from './src/encase-n3';
export {encaseP} from './src/encase-p';
export {encaseP2} from './src/encase-p2';
export {encaseP3} from './src/encase-p3';
export {go, go as do} from './src/go';
export {hook} from './src/hook';
export {node} from './src/node';
export {parallel} from './src/parallel';
export {tryP} from './src/try-p';
