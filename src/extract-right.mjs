import {application1, future} from './internal/check';

export function extractRight(m){
  application1(extractRight, future, m);
  return m.extractRight();
}
