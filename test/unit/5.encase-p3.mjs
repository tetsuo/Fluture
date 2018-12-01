/* eslint prefer-promise-reject-errors: 0 */

import chai from 'chai';
import {encaseP3} from '../../index.mjs';
import * as U from '../util/util';
import {testFunction, functionArg, anyArg} from '../util/props';

var expect = chai.expect;

describe('encaseP3()', function (){

  testFunction('encaseP3', encaseP3, [functionArg, anyArg, anyArg, anyArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('crashes when the Promise generator throws', function (){
      var m = encaseP3(function (){ throw U.error }, 1, 1, 1);
      return U.assertCrashed(m, U.error);
    });

    it('crashes when the Promise generator does not return a Promise', function (){
      var m = encaseP3(U.noop, 1, 1, 1);
      return U.assertCrashed(m, new TypeError(
        'encaseP3() expects the function it\'s given to return a Promise/Thenable\n' +
        '  Actual: undefined\n' +
        '  From calling: function (){}\n' +
        '  With 1: 1\n' +
        '  With 2: 1\n' +
        '  With 3: 1'
      ));
    });

    it('resolves with the resolution value of the returned Promise', function (){
      var actual = encaseP3(function (x, y, z){ return Promise.resolve(z + 1) }, 1, 1, 1);
      return U.assertResolved(actual, 2);
    });

    it('rejects with rejection reason of the returned Promise', function (){
      var actual = encaseP3(function (){ return Promise.reject(U.error) }, 1, 1, 1);
      return U.assertRejected(actual, U.error);
    });

    it('ensures no resolution happens after cancel', function (done){
      var actual = encaseP3(function (x, y, z){ return Promise.resolve(z + 1) }, 1, 1, 1);
      actual._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 20);
    });

    it('ensures no rejection happens after cancel', function (done){
      var actual = encaseP3(function (x, y, z){ return Promise.reject(z + 1) }, 1, 1, 1);
      actual._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 20);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the Future', function (){
      var f = function (a, b, c){ return Promise.resolve(c) };
      var m = encaseP3(f, null, null, null);
      expect(m.toString()).to.equal('encaseP3(' + f.toString() + ', null, null, null)');
    });

  });

});
