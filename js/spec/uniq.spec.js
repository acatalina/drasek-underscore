/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
const {range} = require('underscore');

describe('_.uniq', function () {
  it('is a function', function () {
    expect(_.uniq).to.be.a('function');
  });

  it('returns an empty array when no arguments passed or it is not an array', function () {
    expect(_.uniq(true)).to.eql([]);
    expect(_.uniq({name: 'foo'})).to.eql([]);
  });

  it('returns an array of unique elements and respects the order', function () {
    let actual = _.uniq([1, 1, 2]);
    let expected = [1, 2];
    expect(actual).to.eql(expected);

    actual = _.uniq([1, 1, 2, 5, 2, 2, 3, 4, 5, 5]);
    expected = [1, 2, 5, 3, 4];
    expect(actual).to.eql(expected);
  });

  it('accepts a isSorted value that runs a quicker algorithm', function () {
    let data = range(10000);
    let start, end, notSortedTime, isSortedTime;

    start = Date.now();
    _.uniq(data, true);
    end = Date.now();
    isSortedTime = end - start;

    start = Date.now();
    _.uniq(data, false);
    end = Date.now();
    notSortedTime = end - start;

    expect(isSortedTime).to.be.lessThan(notSortedTime);
  });

  it('does a unique search based on an iteratee given', function () {
    let input = [
      {name: 'bar', text: 'test text'},
      {name: 'foo', text: 'did it work?'},
      {name: 'bar', text: 'did it work? 2'},
      {name: 'foo', text: 'did it work? 3'},
      {name: 'bar', text: 'did it work? 4'},
      {name: 'foo', text: 'did it work? 4'},
      {name: 'bar', text: 'did it work? 5'},
      {name: 'foo', text: 'did it work? 6'}
    ];

    let actual = _.uniq(input, false, (e) => { return e.name; });
    let expected = [
      {name: 'bar', text: 'test text'},
      {name: 'foo', text: 'did it work?'}
    ];
    expect(actual).to.eql(expected);
  });
});
