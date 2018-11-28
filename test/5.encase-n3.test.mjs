import chai from 'chai';
import {encaseN3} from '../index.mjs';
import * as U from './util';
import {testFunction, functionArg, anyArg} from './props';

var expect = chai.expect;

describe('encaseN3()', function (){

  testFunction('encaseN3', encaseN3, [functionArg, anyArg, anyArg, anyArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('crashes when the function throws', function (){
      var m = encaseN3(function (){ throw U.error }, 1, 1, 1);
      return U.assertCrashed(m, U.error);
    });

    it('rejects when the callback is called with (err)', function (){
      var f = function (a, b, c, done){ return done(U.error) };
      return U.assertRejected(encaseN3(f, 'a', 'b', 'c'), U.error);
    });

    it('resolves when the callback is called with (null, a)', function (){
      var f = function (a, b, c, done){ return done(null, a) };
      return U.assertResolved(encaseN3(f, 'a', 'b', 'c'), 'a');
    });

    it('settles with the last synchronous call to done', function (){
      var f = function (a, b, c, done){ done(null, a); done(U.error); done(null, c) };
      return U.assertResolved(encaseN3(f, 'a', 'b', 'c'), 'c');
    });

    it('settles with the first asynchronous call to done', function (){
      var f = function (a, b, c, done){
        setTimeout(done, 10, null, a);
        setTimeout(done, 50, null, c);
      };
      return U.assertResolved(encaseN3(f, 'a', 'b', 'c'), 'a');
    });

    it('ensures no continuations are called after cancel', function (done){
      var f = function (a, b, c, done){ return setTimeout(done, 5) };
      encaseN3(f, 'a', 'b', 'c')._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 20);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the EncaseN', function (){
      var f = function (a, b, c, f){ return void f };
      var m = encaseN3(f, null, null, null);
      expect(m.toString()).to.equal('encaseN3(' + f.toString() + ', null, null, null)');
    });

  });

});
