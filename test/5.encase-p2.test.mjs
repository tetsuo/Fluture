/* eslint prefer-promise-reject-errors: 0 */

import chai from 'chai';
import {encaseP2} from '../index.mjs';
import * as U from './util';
import {testFunction, functionArg, anyArg} from './props';

var expect = chai.expect;

describe('encaseP2()', function (){

  testFunction('encaseP2', encaseP2, [functionArg, anyArg, anyArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('crashes when the Promise generator throws', function (){
      var m = encaseP2(function (){ throw U.error }, 1, 1);
      return U.assertCrashed(m, U.error);
    });

    it('crashes when the Promise generator does not return a Promise', function (){
      var m = encaseP2(U.noop, 1, 1);
      return U.assertCrashed(m, new TypeError(
        'encaseP2() expects the function it\'s given to return a Promise/Thenable\n' +
        '  Actual: undefined\n' +
        '  From calling: function (){}\n' +
        '  With 1: 1\n' +
        '  With 2: 1'
      ));
    });

    it('resolves with the resolution value of the returned Promise', function (){
      var actual = encaseP2(function (x, y){ return Promise.resolve(y + 1) }, 1, 1);
      return U.assertResolved(actual, 2);
    });

    it('rejects with rejection reason of the returned Promise', function (){
      var actual = encaseP2(function (){ return Promise.reject(U.error) }, 1, 1);
      return U.assertRejected(actual, U.error);
    });

    it('ensures no resolution happens after cancel', function (done){
      var actual = encaseP2(function (x, y){ return Promise.resolve(y + 1) }, 1, 1);
      actual._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 20);
    });

    it('ensures no rejection happens after cancel', function (done){
      var actual = encaseP2(function (x, y){ return Promise.reject(y + 1) }, 1, 1);
      actual._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 20);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the Future', function (){
      var f = function (a, b){ return Promise.resolve(b) };
      var m = encaseP2(f, null, null);
      expect(m.toString()).to.equal('encaseP2(' + f.toString() + ', null, null)');
    });

  });

});
