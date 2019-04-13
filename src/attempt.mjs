import {encase} from './encase';

export function attempt(f){
  return encase(f)(undefined);
}
