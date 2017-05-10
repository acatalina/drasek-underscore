/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.difference', function () {
  it('is a function', function () {
    expect(_.difference).to.be.a('function');
  });

  it('handles invalid inputs', function () {
    expect(_.difference()).to.eql([]);
    expect(_.difference(null)).to.eql([]);
    expect(_.difference(undefined)).to.eql([]);
  });

  it('returns the values of array not present in the other arrays', function () {
    let actual = _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
    let expected = [1, 3, 4];
    expect(actual).to.eql(expected);
  });
});
