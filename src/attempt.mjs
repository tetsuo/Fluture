import {encase} from './encase';

export function attempt(_){
  return encase.apply(this, arguments)(undefined);
}
