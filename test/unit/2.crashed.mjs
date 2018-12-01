import show from 'sanctuary-show';
import {Crashed} from '../../src/future';
import {eq, assertValidFuture} from '../util/util';

describe('Crashed', function (){

  it('behaves', function (){
    assertValidFuture(new Crashed(42));
    eq(show(new Crashed(42)), 'Future(function crash(){ throw 42 })');
  });

});
