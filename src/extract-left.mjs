import {application1, future} from './internal/check';

export function extractLeft(m){
  application1(extractLeft, future, m);
  return m.extractLeft();
}
