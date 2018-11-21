import chai from 'chai';
import {encaseN} from '../index.mjs';
import * as U from './util';
import {testFunction, functionArg, anyArg} from './props';

var expect = chai.expect;

describe('encaseN()', function (){

  testFunction('encaseN', encaseN, [functionArg, anyArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('crashes when the function throws', function (){
      var m = encaseN(function (){ throw U.error }, 1);
      return U.assertCrashed(m, U.error);
    });

    it('rejects when the callback is called with (err)', function (){
      var f = function (a, done){ return done(U.error) };
      return U.assertRejected(encaseN(f, 'a'), U.error);
    });

    it('resolves when the callback is called with (null, a)', function (){
      var f = function (a, done){ return done(null, a) };
      return U.assertResolved(encaseN(f, 'a'), 'a');
    });

    it('settles with the last synchronous call to done', function (){
      var f = function (a, done){ done(null, 'a'); done(U.error); done(null, a) };
      return U.assertResolved(encaseN(f, 'b'), 'b');
    });

    it('settles with the first asynchronous call to done', function (){
      var f = function (a, done){
        setTimeout(done, 10, null, a);
        setTimeout(done, 50, null, 'b');
      };
      return U.assertResolved(encaseN(f, 'a'), 'a');
    });

    it('ensures no continuations are called after cancel', function (done){
      var f = function (a, done){ return setTimeout(done, 5) };
      encaseN(f, 'a')._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 20);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the EncaseN', function (){
      var f = function (a, f){ return void f };
      var m = encaseN(f, null);
      expect(m.toString()).to.equal('encaseN(' + f.toString() + ', null)');
    });

  });

});
