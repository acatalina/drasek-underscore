/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const sinon = require('sinon');

describe('_.throttle', function () {
  it('is a function', function () {
    expect(_.throttle).to.be.a('function');
  });

  it('provides a function that can just be called again after a specific amount of time', function () {
    let spy = sinon.spy();
    let tester = _.throttle(spy, 50);
    tester();
    expect(spy.calledOnce).to.be.true;
    tester();
    expect(spy.calledOnce).to.be.true;
  });

  it('calls the function again after the specific amount of time if called twice', function (done) {
    let spy = sinon.spy();
    let tester = _.throttle(spy, 50);
    tester();
    expect(spy.calledOnce).to.be.true;

    tester();
    expect(spy.calledOnce).to.be.true;

    setTimeout(function () {
      expect(spy.callCount).to.equal(2);
      done();
    }, 50);
  });
});
