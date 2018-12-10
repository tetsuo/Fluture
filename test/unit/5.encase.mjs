import chai from 'chai';
import {encase} from '../../index.mjs';
import * as U from '../util/util';
import {testFunction, functionArg, anyArg} from '../util/props';

var expect = chai.expect;

describe('encase()', function (){

  testFunction('encase', encase, [functionArg, anyArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('resolves with the return value of the function', function (){
      var actual = encase(function (x){ return x + 1 }, 1);
      return U.assertResolved(actual, 2);
    });

    it('rejects with the exception thrown by the function', function (){
      var actual = encase(function (a){ throw a, U.error }, 1);
      return U.assertRejected(actual, U.error);
    });

    it('does not swallow errors from subsequent maps and such', function (){
      var m = encase(function (x){ return x }, 1).map(function (){ throw U.error });
      return U.assertCrashed(m, U.error);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the Future', function (){
      var f = function (a){ return void a };
      var m = encase(f, null);
      expect(m.toString()).to.equal('encase(' + f.toString() + ', null)');
    });

  });

});
