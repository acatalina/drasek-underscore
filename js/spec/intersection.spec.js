/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.intersection', function () {
  it('is a function', function () {
    expect(_.intersection).to.be.a('function');
  });

  it('handles invalid inputs', function () {
    expect(_.intersection()).to.eql([]);
    expect(_.intersection(null)).to.eql([]);
    expect(_.intersection({1: 1})).to.eql([]);
  });

  it('finds the values common in all arrays given', function () {
    let actual = _.intersection([1, 2, 3], [101, 2, 1, 10], [2, 1]);
    let expected = [1, 2];
    expect(actual).to.eql(expected);
  });

  it('finds the values common in all arrays and objects given', function () {
    let actual = _.intersection([1, 2, 3], [101, 2, 1, 10], {1: 1, 2: 2});
    let expected = [1, 2];
    expect(actual).to.eql(expected);
  });
});
