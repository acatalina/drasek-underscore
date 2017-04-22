/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.zip', function () {
  it('is a function', function () {
    expect(_.zip).to.be.a('function');
  });

  it('returns an empty array for invalid inputs', function () {
    expect(_.zip()).to.eql([]);
    expect(_.zip(false)).to.eql([]);
    expect(_.zip(null)).to.eql([]);
  });

  it('merges together the values of each of the arrays given with the values at the corresponding position', function () {
    let actual = _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
    let expected = [['moe', 30, true], ['larry', 40, false], ['curly', 50, false]];
    expect(actual).to.eql(expected);
  });

  it('zips together arrays of different lengths', function () {
    let actual = _.zip(['moe', 'larry'], [30, 40, 50], [false]);
    let expected = [['moe', 30, false], ['larry', 40, undefined], [undefined, 50, undefined]];
    expect(actual).to.eql(expected);
  });
});
