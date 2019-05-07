import {encaseP} from './encase-p';

export function attemptP(f){
  return encaseP(f)(undefined);
}
