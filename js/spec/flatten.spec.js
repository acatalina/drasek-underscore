/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.flatten', function () {
  it('is a function', function () {
    expect(_.flatten).to.be.a('function');
  });

  it('handles invalid inputs', function () {
    expect(_.flatten()).to.eql([]);
    expect(_.flatten(null)).to.eql([]);
    expect(_.flatten({1: 1})).to.eql([]);
  });

  it('flattens a one depth nested array', function () {
    expect(_.flatten([1, [2]])).to.eql([1, 2]);
  });

  it('flattens nested arrays', function () {
    expect(_.flatten([1, [[[[2]]]]])).to.eql([1, 2]);
    expect(_.flatten([1, [[[[2, [3]]]]]])).to.eql([1, 2, 3]);
  });

  it('accepts a shallow parameter flatten just one level', function () {
    expect(_.flatten([1, [[[[2]]]]], true)).to.eql([1, [[[2]]]]);
    expect(_.flatten([1, [[[[2]]]]], undefined)).to.eql([1, 2]);
  });
});