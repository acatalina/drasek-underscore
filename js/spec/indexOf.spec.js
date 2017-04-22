/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const {range} = require('underscore');

describe('indexOf', function () {
  it('is a function', function () {
    expect(_.indexOf).to.be.a('function');
  });

  it('returns -1 when invalid inputs are given', function () {
    expect(_.indexOf()).to.equal(-1);
    expect(_.indexOf(1)).to.equal(-1);
    expect(_.indexOf(NaN)).to.equal(-1);
    expect(_.indexOf([1, 2], true)).to.equal(-1);
  });
  
  it('returns the correct index value', function () {
    let actual = _.indexOf([1, 2, 3], 1);
    let expected = 0;
    expect(actual).to.be.equal(expected);
    
    actual = _.indexOf([1, 2, 4, 5, 6, 7, 8, 9, 4, 3, 1, 2, 2, 3], 4);
    expected = 2;
    expect(actual).to.be.equal(expected);
  });

  it('returns -1 when value is not found', function () {
    let actual = _.indexOf([1, 2, 3], 4);
    let expected = -1;
    expect(actual).to.be.equal(expected);
  });

  it('returns the correct value using binary search', function () {
    let actual = _.indexOf([1, 2, 3], 1);
    let expected = 0;
    expect(actual).to.be.equal(expected);
    
    actual = _.indexOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 4, true);
    expected = 3;
    expect(actual).to.be.equal(expected);
  });

  it('returns -1 one when value is not found using binary search', function () {
    let actual = _.indexOf([1, 2, 3], 4);
    let expected = -1;
    expect(actual).to.be.equal(expected);
    
    actual = _.indexOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], -1, true);
    expected = -1;
    expect(actual).to.be.equal(expected);
  });

  it('performs a quicker search if true as third argument is given', function () {
    let data = range(1000000);
    let start, end, selectionTime, binaryTime;
    start = Date.now();
    _.indexOf(data, 999999);
    end = Date.now();
    selectionTime = end - start;

    start = Date.now();
    _.indexOf(data, 999999, true);
    end = Date.now();
    binaryTime = end - start;
    
    expect(binaryTime).to.be.lessThan(selectionTime);
  });

  it('returns index value from index value given as a third argument', function () {
    let actual = _.indexOf([1, 2, 4, 5, 6, 7, 8, 9, 4, 3, 1, 2, 2, 3], 4, 11);
    let expected = -1;
    expect(actual).to.be.equal(expected);
    actual = _.indexOf([1, 2, 4, 5, 6, 7, 8, 9, 4, 3, 1, 2, 2, 3], 4, 3);
    expected = 8;
    expect(actual).to.be.equal(expected);
  });
});
