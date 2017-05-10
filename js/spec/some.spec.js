/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const sinon = require('sinon');

describe('_.some', function () {
  it('is a function', function () {
    expect(_.some).to.be.a('function');
  });

  it('handles invalid inputs returning false', function () {
    expect(_.some()).to.eql(false);
    expect(_.some(1)).to.eql(false);
    expect(_.some(NaN)).to.eql(false);
  });

  it('returns true and stops counting if at least one value pass the criteria', function () {
    let spy = sinon.spy(function (n) { return n < 3; });
    let expected = true;
    let actual = _.some([1, 2, 3], spy);
    expect(actual).to.eql(expected);
    expect(spy.callCount).to.eql(1);

    spy = sinon.spy(function (n) { return n < 3; });
    actual = _.some({n: 1, b: 2, c: 2}, spy);
    expect(actual).to.eql(expected);
    expect(spy.callCount).to.eql(1);
  });

  it('returns false when all items are false', function () {
    let spy = sinon.spy(function (n) { return n > 4; });
    let expected = false;
    let actual = _.some([1, 2, 3], spy);
    expect(actual).to.eql(expected);
    expect(spy.callCount).to.eql(3);

    spy = sinon.spy(function (n) { return n > 3; });
    actual = _.some({n: 1, b: 2, c: 3}, spy);
    expect(actual).to.eql(expected);
    expect(spy.callCount).to.eql(3);
  });

  it('binds the iteratee to the context given', function () {
    let spy = sinon.spy();
    _.some([1, 2, 3], spy, [2, 3, 4]);
    expect(spy.thisValues[0]).to.eql([2, 3, 4]);
  });
});
