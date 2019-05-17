import {encaseP} from './encase-p';

export function attemptP(_){
  return encaseP.apply(this, arguments)(undefined);
}
