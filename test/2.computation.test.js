import {expect} from 'chai';
import Future from '../index.mjs.js';
import * as U from './util';
import type from 'sanctuary-type-identifiers';

describe('Future()', function(){

  it('is a unary function', function(){
    expect(Future).to.be.a('function');
    expect(Future.length).to.equal(1);
  });

  it('throws TypeError when not given a function', function(){
    var xs = [NaN, {}, [], 1, 'a', new Date, undefined, null];
    var fs = xs.map(function(x){ return function(){ return Future(x) } });
    fs.forEach(function(f){ return expect(f).to.throw(TypeError, /Future/) });
  });

  it('returns a Future', function(){
    var actual = Future(U.noop);
    expect(actual).to.be.an.instanceof(Future);
  });

  it('can be called with "new", for those feeling particularly OO', function(){
    var actual = new Future(U.noop);
    expect(actual).to.be.an.instanceof(Future);
  });

});

describe('Computation', function(){

  it('extends Future', function(){
    expect(Future(U.noop)).to.be.an.instanceof(Future);
  });

  it('is considered a member of fluture/Fluture', function(){
    expect(type(Future(U.noop))).to.equal(Future['@@type']);
  });

  describe('#_interpret()', function(){

    it('crashes when the computation throws an error', function(){
      var m = Future(function(){ throw U.error });
      return U.assertCrashed(m, new Error(
        'Error came up while Future was running its computation:\n' +
        '  Intentional error for unit testing\n\n' +
        '  In: Future(function (){ throw U.error })\n'
      ));
    });

    it('crashes when the computation returns nonsense', function(){
      var m = Future(function(){ return 1 });
      return U.assertCrashed(m, new Error(
        'TypeError came up while Future ran its computation:\n' +
        '  The computation was expected to return a nullary function or void\n' +
        '    Actual: 1\n\n' +
        '  In: Future(function (){ return 1 })\n'
      ));
    });

    it('does not throw when the computation returns a nullary function or void', function(){
      var xs = [undefined, function(){}];
      var ms = xs.map(function(x){ return Future(function(){ return x }) });
      var fs = ms.map(function(m){ return function(){ return m._interpret(U.throwit, U.noop, U.noop) } });
      fs.forEach(function(f){ return expect(f).to.not.throw() });
    });

    it('ensures no continuations are called after the first resolve', function(done){
      var actual = Future(function(rej, res){
        res(1);
        res(2);
        rej(3);
      });
      actual._interpret(done, U.failRej, function(){ return done() });
    });

    it('ensures no continuations are called after the first reject', function(done){
      var actual = Future(function(rej, res){
        rej(1);
        rej(2);
        res(3);
      });
      actual._interpret(done, function(){ return done() }, U.failRes);
    });

    it('stops continuations from being called after cancellation', function(done){
      Future(function(rej, res){
        setTimeout(res, 20, 1);
        setTimeout(rej, 20, 1);
      })
      ._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });

    it('cannot continue during cancellation (#216)', function(){
      Future(function(rej, res){
        return function(){
          rej();
          res();
        };
      })
      ._interpret(U.throwit, U.failRej, U.failRes)();
    });

    it('stops cancellation from being called after continuations', function(){
      var m = Future(function(rej, res){
        res(1);
        return function(){ throw U.error };
      });
      var cancel = m._interpret(U.throwit, U.failRej, U.noop);
      cancel();
    });

  });

  describe('#toString()', function(){

    it('returns a customized representation', function(){
      var m = Future(function(rej, res){ res() });
      expect(m.toString()).to.contain('Future');
    });

  });

});
