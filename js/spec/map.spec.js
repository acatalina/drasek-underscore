/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const sinon = require('sinon');

describe('_.map', function () {
  it('is a function', function () {
    expect(_.map).to.be.a('function');
  });

  it('returns an empty array for invalid inputs', function () {
    expect(_.map()).to.eql([]);
    expect(_.map(1)).to.eql([]);
    expect(_.map(NaN)).to.eql([]);
  });

  it('checks every element on a list', function () {
    let spy = sinon.spy();
    _.map([1, 2, 3], spy);
    expect(spy.callCount).to.eql(3);
    
    spy = sinon.spy();
    _.map({1: 1, 2: 2, 3: 3}, spy);
    expect(spy.callCount).to.eql(3);
  });

  it('returns a mapped list', function () {
    let iteratee = function (n) { return n + 1; };
    let actual = _.map([1, 2, 3], iteratee);
    let expected = [2, 3, 4];
    expect(actual).to.eql(expected);
    
    actual = _.map({one: 1, two: 2, three: 3}, iteratee);
    expected = [2, 3, 4];
    expect(actual).to.eql(expected);
  });

  it('binds the iteratee to the context given', function () {
    let spy = sinon.spy();
    _.map([1, 2, 3], spy, [2, 3, 4]);
    expect(spy.thisValues[0]).to.eql([2, 3, 4]);
  });
});
