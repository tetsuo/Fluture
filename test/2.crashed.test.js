import {expect} from 'chai';
import {Future, isFuture} from '../index.mjs.js';
import {Crashed} from '../src/future.js';
import show from 'sanctuary-show';

describe('Crashed', function (){

  it('Creates members of Future', function (){
    expect(isFuture(new Crashed(42))).to.equal(true);
    expect(new Crashed(42)).to.be.an.instanceof(Future);
  });

  it('is represented by show', function (){
    expect(show(new Crashed(42))).to.equal('Future(function crash(){ throw 42 })');
  });

});
