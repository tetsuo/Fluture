import chai from 'chai';
import {node} from '../../index.js';
import {test, assertCrashed, assertRejected, assertResolved, assertValidFuture, error} from '../util/util.js';
import {testFunction, functionArg} from '../util/props.js';

var expect = chai.expect;

testFunction('node', node, [functionArg], assertValidFuture);

test('crashes when the function throws', function (){
  var m = node(function (){ throw error });
  return assertCrashed(m, error);
});

test('rejects when the callback is called with (err)', function (){
  var f = function (done){ return done(error) };
  return assertRejected(node(f), error);
});

test('resolves when the callback is called with (null, a)', function (){
  var f = function (done){ return done(null, 'a') };
  return assertResolved(node(f), 'a');
});

test('settles with the last synchronous call to done', function (){
  var f = function (done){ done(null, 'a'); done(error); done(null, 'b') };
  return assertResolved(node(f), 'b');
});

test('settles with the first asynchronous call to done', function (){
  var f = function (done){
    setTimeout(done, 10, null, 'a');
    setTimeout(done, 50, null, 'b');
  };
  return assertResolved(node(f), 'a');
});

test('ensures no continuations are called after cancel', function (done){
  const fail = () => done(error);
  var f = function (done){ return setTimeout(done, 5) };
  node(f)._interpret(done, fail, fail)();
  setTimeout(done, 20);
});

test('returns the code to create the Future when cast to String', function (){
  var f = function (a){ return void a };
  var m = node(f);
  expect(m.toString()).to.equal('node (' + f.toString() + ')');
});
