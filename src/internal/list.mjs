/* eslint no-param-reassign:0 */

export var nil = {head: null};
nil.tail = nil;

export function isNil(list){
  return list.tail === list;
}

export function cons(head, tail){
  return {head: head, tail: tail};
}
