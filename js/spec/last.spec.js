/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.last', function () {
  it('is a function', function () {
    expect(_.last).to.be.a('function');
  });

  it('returns undefined if no arguments or not an array is given', function () {
    expect(_.first()).to.eql(undefined);
    expect(_.first(3)).to.eql(undefined);
  });

  it('return the last element of an array', function () {
    var actual = _.last([1, 2, 3]);
    var expected = 3;
    expect(actual).to.eql(expected);
    
    actual = _.last([{name: 'first'}, {name: 'second'}]);
    expected = {name: 'second'};
    expect(actual).to.eql(expected);
  });

  it('allows a boolean as a trigger for a second argument', function () {
    let actual = _.last([1, 2, 3], true);
    let expected = 3;
    expect(actual).to.eql(expected);
    
    actual = _.last([1, 2, 3], false);
    expected = [];
    expect(actual).to.eql(expected);
  });

  it('return the last n elements of an array', function () {
    var actual = _.last([1, 2, 3], 2);
    var expected = [2, 3];
    expect(actual).to.eql(expected);
    
    actual = _.last([{name: 'first'}, {name: 'second'}, {name: 'third'}], 2);
    expected = [{name: 'second'}, {name: 'third'}];
    expect(actual).to.eql(expected);
  });

  it('does not break if an array is given as a second argument. Instead, it takes the first element of the array as n value', function () {
    let actual = _.last([1, 2, 3], [2, 1]);
    let expected = [2, 3];
    expect(actual).to.eql(expected);
  });
});