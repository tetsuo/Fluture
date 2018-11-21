import chai from 'chai';
import {encaseN2} from '../index.mjs';
import * as U from './util';
import {testFunction, functionArg, anyArg} from './props';

var expect = chai.expect;

describe('encaseN2()', function (){

  testFunction('encaseN2', encaseN2, [functionArg, anyArg, anyArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('crashes when the function throws', function (){
      var m = encaseN2(function (){ throw U.error }, 1, 1);
      return U.assertCrashed(m, U.error);
    });

    it('rejects when the callback is called with (err)', function (){
      var f = function (a, b, done){ return done(U.error) };
      return U.assertRejected(encaseN2(f, 'a', 'b'), U.error);
    });

    it('resolves when the callback is called with (null, a)', function (){
      var f = function (a, b, done){ return done(null, a) };
      return U.assertResolved(encaseN2(f, 'a', 'b'), 'a');
    });

    it('settles with the last synchronous call to done', function (){
      var f = function (a, b, done){ done(null, a); done(U.error); done(null, b) };
      return U.assertResolved(encaseN2(f, 'a', 'b'), 'b');
    });

    it('settles with the first asynchronous call to done', function (){
      var f = function (a, b, done){
        setTimeout(done, 10, null, a);
        setTimeout(done, 50, null, b);
      };
      return U.assertResolved(encaseN2(f, 'a', 'b'), 'a');
    });

    it('ensures no continuations are called after cancel', function (done){
      var f = function (a, b, done){ return setTimeout(done, 5) };
      encaseN2(f, 'a', 'b')._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 20);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the EncaseN', function (){
      var f = function (a, b, f){ return void f };
      var m = encaseN2(f, null, null);
      expect(m.toString()).to.equal('encaseN2(' + f.toString() + ', null, null)');
    });

  });

});
