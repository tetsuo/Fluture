import chai from 'chai';
import FL from 'fantasy-land';
import {Future, of} from '../index.mjs';
import * as U from './util';
import {testFunction, anyArg} from './props';

var expect = chai.expect;

describe('of()', function (){

  it('is also available as fantasy-land function', function (){
    expect(of).to.equal(Future[FL.of]);
  });

  testFunction('of', of, [anyArg], U.assertValidFuture);

  describe('#_interpret()', function (){

    it('calls success callback with the value', function (){
      return U.assertResolved(of(1), 1);
    });

  });

  describe('#extractRight()', function (){

    it('returns array with the value', function (){
      expect(of(1).extractRight()).to.deep.equal([1]);
    });

  });

  describe('#toString()', function (){

    it('returns the code to create the Resolved', function (){
      expect(of(1).toString()).to.equal('Future.of(1)');
    });

  });

});
