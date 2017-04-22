/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const sinon = require('sinon');

describe('_.delay', function () {
  it('is a function', function () {
    expect(_.delay).to.be.a('function');
  });
  
  it('calls a function after a specified amount of time', function (done) {
    let spy = sinon.spy();
    _.delay(spy, 50);
    expect(spy.calledOnce).to.be.false;

    setTimeout(function () {
      expect(spy.calledOnce).to.be.true;
      done();
    }, 100);
  });

  it('passes the arguments given to the function', function (done) {
    let spy = sinon.spy();
    _.delay(spy, 50, 5, 6);
    
    setTimeout(function () {
      expect(spy.calledOnce).to.be.true;
      expect(spy.calledWithExactly(5, 6)).to.equal(true);
      done();
    }, 100);
  });
});

