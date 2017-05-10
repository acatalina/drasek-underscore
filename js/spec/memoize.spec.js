/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const sinon = require('sinon');

describe('_.memoize', function () {
  it('is a function', function () {
    expect(_.memoize).to.be.a('function');
  });

  it('it does what the input function does', function () {
    let iteratee = function (n) { return n * 2; };
    let tester = _.memoize(iteratee);

    let actual = tester(2);
    let expected = 4;
    expect(actual).to.equal(expected);
  });

  it('holds the values computed not having to compute them again', function () {
    let spy = sinon.spy(function (n) { return n * 2; });
    let tester = _.memoize(spy);
    tester(2);
    tester(2);

    let actual = spy.callCount;
    let expected = 1;
    expect(actual).to.equal(expected);
  });

  it('has a cache method that returns the cache stored', function () {
    let iteratee = function (n) { return n * 2; };
    let tester = _.memoize(iteratee);
    tester(2);

    let actual = tester.cache;
    let expected = {2: 4};
    expect(actual).to.eql(expected);
  });

  it('allows a hashFunction as a second argument to compute the hash key for storing', function () {
    let iteratee = function (n) { return n * 2; };
    let hashFunction = function (n) { return 'num' + n; };
    let tester = _.memoize(iteratee, hashFunction);
    tester(2);

    let actual = tester.cache;
    let expected = {'num2': 4};
    expect(actual).to.eql(expected);
  });
});
