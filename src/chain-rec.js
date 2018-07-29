import {of} from './core';
import {Next, Done} from './internal/iteration';

export function chainRec(step, init){
  return of(Next(init))._chain(function chainRec$recur(state){
    return state.done ? of(state.value) : step(Next, Done, state.value)._chain(chainRec$recur);
  });
}
