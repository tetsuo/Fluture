import chai from 'chai';
import {after, never} from '../../index.mjs';
import * as U from '../util/util';
import {testFunction, positiveIntegerArg, anyArg} from '../util/props';

var expect = chai.expect;

describe('after()', function (){

  testFunction('after', after, [positiveIntegerArg, anyArg], U.assertValidFuture);

  it('returns Never when given Infinity', function (){
    expect(after(Infinity, 1)).to.equal(never);
  });

  describe('#_interpret()', function (){
    it('calls success callback with the value', function (){
      return U.assertResolved(after(20, 1), 1);
    });

    it('clears its internal timeout when cancelled', function (done){
      after(20, 1)._interpret(done, U.failRej, U.failRes)();
      setTimeout(done, 25);
    });
  });

  describe('#swap()', function (){
    it('returns a rejected Future', function (){
      var m = after(10, 1);
      return U.assertRejected(m.swap(), 1);
    });
  });

  describe('#extractRight()', function (){
    it('returns array with the value', function (){
      expect(after(20, 1).extractRight()).to.deep.equal([1]);
    });
  });

  describe('#toString()', function (){
    it('returns the code to create the After', function (){
      expect(after(20, 1).toString()).to.equal('after(20, 1)');
    });
  });

});
