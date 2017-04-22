/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.first', function () {
  it('is a function', function () {
    expect(_.first).to.be.a('function');
  });

  it('returns undefined if no arguments or not an array is given', function () {
    expect(_.first()).to.eql(undefined);
    expect(_.first(3)).to.eql(undefined);
  });

  it('returns the first element of an array', function () {
    let actual = _.first([1, 2, 3]);
    let expected = 1;
    expect(actual).to.eql(expected);
    
    actual = _.first([{name: 'first'}, {name: 'second'}]);
    expected = {name: 'first'};
    expect(actual).to.eql(expected);
  });

  it('allows a boolean as a trigger for a second argument', function () {
    let actual = _.first([1, 2, 3], true);
    let expected = 1;
    expect(actual).to.eql(expected);
    
    actual = _.first([1, 2, 3], false);
    expected = [];
    expect(actual).to.eql(expected);
  });

  it('allows n as a second argument and returns the first n elements of an array', function () {
    let actual = _.first([1, 2, 3], 2);
    let expected = [1, 2];
    expect(actual).to.eql(expected);
    
    actual = _.first([{name: 'first'}, {name: 'second'}, {name: 'third'}], 2);
    expected = [{name: 'first'}, {name: 'second'}];
    expect(actual).to.eql(expected);
  });

  it('does not break if an array is given as a second argument. Instead, it takes the first element of the array as n value', function () {
    let actual = _.first([1, 2, 3], [2, 1]);
    let expected = [1, 2];
    expect(actual).to.eql(expected);
  });
});