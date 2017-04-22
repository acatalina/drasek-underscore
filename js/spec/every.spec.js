/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const sinon = require('sinon');
  
describe('_.every', function () {    
  it('is a function', function () {
    expect(_.every).to.be.a('function');
  });

  it('returns true for invalid inputs', function () {
    expect(_.every()).to.eql(true);
    expect(_.every(1)).to.eql(true);
    expect(_.every(NaN)).to.eql(true);
  });

  it('returns false and stops checking if one value does not pass the criteria', function () {
    let spy = sinon.spy(function (n) { return n < 3; });
    let expected = false;
    let actual = _.every([1, 2, 3, 4, 5], spy);
    expect(actual).to.eql(expected);
    expect(spy.callCount).to.eql(3);
  });

  it('returns true when all items pass the criteria', function () {
    let spy = sinon.spy(function (n) { return n < 6; });
    let expected = true;
    let actual = _.every([1, 2, 3, 4, 5], spy);
    expect(actual).to.eql(expected);
    expect(spy.callCount).to.eql(5);
  });

  it('binds the iteratee to the context given', function () {
    let spy = sinon.spy();
    _.every([1, 2, 3], spy, [2, 3, 4]);
    expect(spy.thisValues[0]).to.eql([2, 3, 4]);
  });
});