import concurrify from 'concurrify';
import type from 'sanctuary-type-identifiers';

import {captureContext} from './src/internal/debug';
import {invalidArgument} from './src/internal/error';
import {nil} from './src/internal/list';
import {FL} from './src/internal/const';

import {Future, never} from './src/future';

import {AltTransformation} from './src/alt';
import {ApTransformation} from './src/ap';
import {BimapTransformation} from './src/bimap';
import {ChainTransformation} from './src/chain';
import {MapTransformation} from './src/map';

import {chainRec} from './src/chain-rec';
import {parallelAp} from './src/parallel-ap';
import {race} from './src/race';
import {resolve} from './src/resolve';

Future[FL.of] = resolve;
Future[FL.chainRec] = chainRec;

Future.prototype[FL.ap] = function Future$FL$ap(other){
  var context = captureContext(nil, 'a Fantasy Land dispatch to ap', Future$FL$ap);
  return other._transform(new ApTransformation(context, this));
};

Future.prototype[FL.map] = function Future$FL$map(mapper){
  var context = captureContext(nil, 'a Fantasy Land dispatch to map', Future$FL$map);
  return this._transform(new MapTransformation(context, mapper));
};

Future.prototype[FL.bimap] = function Future$FL$bimap(lmapper, rmapper){
  var context = captureContext(nil, 'a Fantasy Land dispatch to bimap', Future$FL$bimap);
  return this._transform(new BimapTransformation(context, lmapper, rmapper));
};

Future.prototype[FL.chain] = function Future$FL$chain(mapper){
  var context = captureContext(nil, 'a Fantasy Land dispatch to chain', Future$FL$chain);
  return this._transform(new ChainTransformation(context, mapper));
};

Future.prototype[FL.alt] = function Future$FL$alt(other){
  var context = captureContext(nil, 'a Fantasy Land dispatch to alt', Future$FL$alt);
  return this._transform(new AltTransformation(context, other));
};

function uncurry(f){
  return function(a, b){
    return f(a)(b);
  };
}

export var Par = concurrify(Future, never, uncurry(race), uncurry(parallelAp));

export function isParallel(x){
  return x instanceof Par || type(x) === Par['@@type'];
}

export function seq(par){
  if(!isParallel(par)) throw invalidArgument('seq', 0, 'be a ConcurrentFuture', par);
  return par.sequential;
}

export {Future as default, Future};
export {isFuture, never, isNever} from './src/future';

export {after} from './src/after';
export {alt} from './src/alt';
export {and} from './src/and';
export {ap} from './src/ap';
export {attemptP} from './src/attempt-p';
export {attempt} from './src/attempt';
export {bimap} from './src/bimap';
export {both} from './src/both';
export {cache} from './src/cache';
export {chainRej} from './src/chain-rej';
export {chain} from './src/chain';
export {done} from './src/done';
export {encaseP} from './src/encase-p';
export {encase} from './src/encase';
export {extractLeft} from './src/extract-left';
export {extractRight} from './src/extract-right';
export {fold} from './src/fold';
export {forkCatch} from './src/fork-catch';
export {fork} from './src/fork';
export {go} from './src/go';
export {hook} from './src/hook';
export {lastly} from './src/lastly';
export {mapRej} from './src/map-rej';
export {map} from './src/map';
export {node} from './src/node';
export {parallelAp} from './src/parallel-ap';
export {parallel} from './src/parallel';
export {promise} from './src/promise';
export {race} from './src/race';
export {rejectAfter} from './src/reject-after';
export {reject} from './src/reject';
export {resolve} from './src/resolve';
export {swap} from './src/swap';
export {value} from './src/value';

export {debugMode} from './src/internal/debug';
