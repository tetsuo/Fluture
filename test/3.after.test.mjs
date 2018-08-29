import chai from 'chai';
import {Future, after, never} from '../index.mjs';
import * as U from './util';
import type from 'sanctuary-type-identifiers';

var expect = chai.expect;

describe('after()', function (){

  it('is a curried binary function', function (){
    expect(after).to.be.a('function');
    expect(after.length).to.equal(2);
    expect(after(20)).to.be.a('function');
  });

  it('throws TypeError when not given a number as first argument', function (){
    var xs = [{}, [], 'a', new Date, undefined, null];
    var fs = xs.map(function (x){ return function (){ return after(x) } });
    fs.forEach(function (f){ return expect(f).to.throw(TypeError, /Future/) });
  });

  it('returns an instance of Future', function (){
    expect(after(20, 1)).to.be.an.instanceof(Future);
  });

  it('returns Never when given Infinity', function (){
    expect(after(Infinity, 1)).to.equal(never);
  });

});

describe('After', function (){

  var m = after(20, 1);

  it('extends Future', function (){
    expect(m).to.be.an.instanceof(Future);
  });

  it('is considered a member of fluture/Fluture', function (){
    expect(type(m)).to.equal(Future['@@type']);
  });

  describe('#_interpret()', function (){

    it('calls success callback with the value', function (){
      return U.assertResolved(m, 1);
    });

    it('clears its internal timeout when cancelled', function (done){
      after(20, 1)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

  });

  describe('#race()', function (){

    it('races undeterministic Futures the conventional way', function (){
      var m = after(1, 1);
      var undeterministic = Future(function (){});
      var actual = m.race(undeterministic);
      expect(actual).to.not.equal(m);
      expect(actual).to.not.equal(undeterministic);
      return U.assertResolved(actual, 1);
    });

  });

  describe('#swap()', function (){

    it('returns a rejected Future', function (){
      var m = after(10, 1);
      return U.assertRejected(m.swap(), 1);
    });

  });

  describe('#extractRight()', function (){

    it('returns array with the value', function (){
      expect(m.extractRight()).to.deep.equal([1]);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the After', function (){
      expect(m.toString()).to.equal('Future.after(20, 1)');
    });

  });

});
