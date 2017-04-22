/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const {range} = require('underscore');
const _ = require(path.join(__dirname, '..', 'underscore'));
 
describe('_.contains', function () {    
  it('is a function', function () {
    expect(_.contains).to.be.a('function');
  });

  it('returns false when invalid inputs are given', function () {
    expect(_.contains()).to.equal(false);
    expect(_.contains(1)).to.equal(false);
    expect(_.contains(NaN)).to.equal(false);
  });

  it('returns false when item is not found', function () {
    let expected = false;
    let actual = _.contains([1, 2, 3], 4);
    expect(actual).to.eql(expected);

    expected = false;
    actual = _.contains({1: 2, 3: 4}, 1);
    expect(actual).to.eql(expected);
  });

  it('returns true when item is found', function () {
    let expected = true;
    let actual = _.contains([1, 2, 3], 3);
    expect(actual).to.eql(expected);
    
    expected = true;
    actual = _.contains({1: 2, 3: 4}, 2);
    expect(actual).to.eql(expected);    
  });

  it('allows a fromIndex value for arrays', function () {
    let expected = false;
    let actual = _.contains([1, 2, 3], 1, 1);
    expect(actual).to.eql(expected);

    expected = true;
    actual = _.contains([1, 2, 3], 1, 0);
    expect(actual).to.eql(expected);
  });

  it('stops searching when finds a matching value', function () {
    let data = range(1000000);
    let start, end, firstElem, lastElem;
    start = Date.now();
    _.contains(data, 1);
    end = Date.now();
    firstElem = end - start;

    start = Date.now();
    _.contains(data, 1000000);
    end = Date.now();
    lastElem = end - start;
    
    expect(firstElem).to.be.lessThan(lastElem);
  });
});