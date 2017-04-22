/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.pluck', function () {
  it('is a function', function () {
    expect(_.pluck).to.be.a('function');
  });

  it('manages invalid inputs returning an empty array', function () {
    expect(_.pluck()).to.eql([]);
    expect(_.pluck(1)).to.eql([]);
    expect(_.pluck(NaN)).to.eql([]);
  });

  it('extracts property values', function () {
    let actual = _.pluck([
      {num: 1, c: 0}, 
      {num: 2, c: 3}, 
      {num: 3, c: 1}
      ], 'num'); 
    let expected = [1, 2, 3];
    expect(actual).to.eql(expected);
  });

  it('returns an undefined array when no properties are found', function () {
    let actual = _.pluck([1]);
    let expected = [undefined];
    expect(actual).to.eql(expected);
  });
});
