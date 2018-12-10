import chai from 'chai';
import {encase3} from '../../index.mjs';
import * as U from '../util/util';
import {testFunction, functionArg, anyArg} from '../util/props';

var expect = chai.expect;

describe('encase3()', function (){

  testFunction('encase3', encase3, [functionArg, anyArg, anyArg, anyArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('resolves with the return value of the function', function (){
      var actual = encase3(function (a, b, x){ return x + 1 }, 1, 1, 1);
      return U.assertResolved(actual, 2);
    });

    it('rejects with the exception thrown by the function', function (){
      var actual = encase3(function (a, b, c){ throw c, U.error }, 1, 1, 1);
      return U.assertRejected(actual, U.error);
    });

    it('does not swallow errors from subsequent maps and such', function (){
      var m = encase3(function (x){ return x }, 1, 1, 1).map(function (){ throw U.error });
      return U.assertCrashed(m, U.error);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the Future', function (){
      var f = function (a, b){ return void b };
      var m = encase3(f, null, null, null);
      expect(m.toString()).to.equal('encase3(' + f.toString() + ', null, null, null)');
    });

  });

});
