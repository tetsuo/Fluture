import chai from 'chai';
import {Future, reject} from '../../index.mjs';
import * as U from '../util/util';
import {testFunction, anyArg} from '../util/props';

var expect = chai.expect;

describe('reject()', function (){

  testFunction('reject', reject, [anyArg], U.assertValidFuture);

  it('returns an instance of Future', function (){
    expect(reject(1)).to.be.an.instanceof(Future);
  });

  describe('#_interpret()', function (){

    it('calls failure callback with the reason', function (){
      return U.assertRejected(reject(1), 1);
    });

  });

  describe('#extractLeft()', function (){

    it('returns array with the reason', function (){
      expect(reject(1).extractLeft()).to.deep.equal([1]);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the Rejected', function (){
      expect(reject(1).toString()).to.equal('reject(1)');
    });

  });

});
