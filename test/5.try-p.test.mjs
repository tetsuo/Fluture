/* eslint prefer-promise-reject-errors: 0 */

import chai from 'chai';
import {tryP} from '../index.mjs';
import * as U from './util';
import {testFunction, functionArg} from './props';

var expect = chai.expect;

describe('tryP()', function (){

  testFunction('tryP', tryP, [functionArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('crashes when the Promise generator throws', function (){
      var m = tryP(function (){ throw U.error });
      return U.assertCrashed(m, U.error);
    });

    it('crashes when the Promise generator does not return a Promise', function (){
      var m = tryP(U.noop);
      return U.assertCrashed(m, new TypeError(
        'tryP() expects the function it\'s given to return a Promise/Thenable\n' +
        '  Actual: undefined\n' +
        '  From calling: function (){}'
      ));
    });

    it('resolves with the resolution value of the returned Promise', function (){
      var actual = tryP(function (){ return Promise.resolve(1) });
      return U.assertResolved(actual, 1);
    });

    it('rejects with rejection reason of the returned Promise', function (){
      var actual = tryP(function (){ return Promise.reject(U.error) });
      return U.assertRejected(actual, U.error);
    });

    it('ensures no resolution happens after cancel', function (done){
      var actual = tryP(function (){ return Promise.resolve(1) });
      actual._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 20);
    });

    it('ensures no rejection happens after cancel', function (done){
      var actual = tryP(function (){ return Promise.reject(1) });
      actual._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 20);
    });

    it('crashes with errors that occur in rejection continuation', function (){
      var m = tryP(function (){ return Promise.resolve(1) }).map(function (){ throw U.error });
      return U.assertCrashed(m, U.error);
    });

    it('crashes with errors that occur in resolution continuation', function (){
      var m = tryP(function (){ return Promise.reject(1) }).mapRej(function (){ throw U.error });
      return U.assertCrashed(m, U.error);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the Future', function (){
      var f = function (){ return Promise.resolve(42) };
      var m = tryP(f);
      expect(m.toString()).to.equal('tryP(' + f.toString() + ')');
    });

  });

});
