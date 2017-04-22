/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const sinon = require('sinon');

describe('_.filter', function () {
  it('is a function', function () {
    expect(_.filter).to.be.a('function');
  });

  it('returns an empty array for invalid inputs', function () {
    expect(_.filter()).to.eql([]);
    expect(_.filter(1)).to.eql([]);
    expect(_.filter(NaN)).to.eql([]);
  });

  it('checks every element on a list', function () {
    let spy = sinon.spy();
    _.filter([1, 2, 3], spy);
    expect(spy.callCount).to.eql(3);
    
    spy = sinon.spy();
    _.filter({1: 1, 2: 2, 3: 3}, spy);
    expect(spy.callCount).to.eql(3);
  });

  it('returns a filtered list', function () {
    const predicate = function (n) { return n < 3; };
    let actual = _.filter([1, 2, 3], predicate);
    expect(actual).to.eql([1, 2]);
    
    actual = _.filter({one: 1, two: 2, three: 3}, predicate);
    expect(actual).to.eql([1, 2]);
  });

  it('binds the context given as a third argument to the predicate', function () {
    let spy = sinon.spy();
    _.filter([1, 2, 3], spy, [2, 3, 4]);
    expect(spy.thisValues[0]).to.eql([2, 3, 4]);
  });
});
