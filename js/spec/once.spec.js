/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const sinon = require('sinon');

describe('_.once', function () {
  it('is a function', function () {
    expect(_.once).to.be.a('function');
  });

  it('returns a function that can only be initialize once returning the same result every call', function () {
    let spy = sinon.spy(function () { return Math.random(); });
    let tester = _.once(spy);
    let firstCall = tester();
    let secondCall = tester();
    let thirdCall = tester();

    let actual = spy.callCount;
    let expected = 1;
    expect(actual).to.equal(expected);
    expect(firstCall).to.equal(secondCall);
    expect(firstCall).to.equal(thirdCall);
  });
});
