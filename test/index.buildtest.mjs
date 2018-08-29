import chai from 'chai';
import {noop} from './util';
import * as Fluture from '../index.mjs';
import Future from '../index.js';

var expect = chai.expect;

describe('CommonJS build output', function (){

  it('exports the Future constructor by default', function (){
    expect(Future).to.be.a('function');
    expect(Future(noop)).to.be.an.instanceof(Future);
  });

  it('has a Future property that refers to itself for import destructuring', function (){
    expect(Future.Future).to.equal(Future);
  });

  it('has all desired properties', function (){
    Object.keys(Fluture).forEach(key => {
      expect(typeof Future[key] === typeof Fluture[key]);
    });
  });

  it('exports Future with the correct name property', function (){
    expect(Future.name).to.equal(Fluture.Future.name);
  });

});
