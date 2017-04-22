/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const sinon = require('sinon');

describe('_.each', function () {    
  it('is a function', function () {
    expect(_.each).to.be.a('function');
  });

  it('returns back whatever is given', function () {
    let expected = [1, 2, 3];
    let actual = _.each(expected, function () {});
    expect(actual).to.equal(expected);      
    expected = {1: 1};
    actual = _.each(expected, function () {});
    expect(actual).to.equal(expected);
    expected = true;
    actual = _.each(expected, function () {});
    expect(actual).to.equal(expected);
    expected = NaN;
    actual = _.each(expected, function () {});
    expect(actual).to.eql(expected);
    expected = undefined;
    actual = _.each(expected, function () {});
    expect(actual).to.eql(expected);
  });

  it('calls the iteratee for each element of the list', function () {
    let spy = sinon.spy();
    let arr = [1, 2, 3];
    _.each(arr, spy);
    expect(spy.callCount).to.equal(3);
    spy = sinon.spy();
    let obj = {1: 1, 2: 2};
    _.each(obj, spy);
    expect(spy.callCount).to.equal(2);
  });

  it('binds the iteratee to the context given', function () {
    let spy = sinon.spy();
    _.each([1, 2, 3], spy, [2, 3, 4]);
    expect(spy.thisValues[0]).to.eql([2, 3, 4]);
  });
});
