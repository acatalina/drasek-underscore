/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.invoke', function () {
  it('is a function', function () {
    expect(_.invoke).to.be.a('function');
  });

  it('invokes the method given every element on the list and return the result', function () {
    expect(_.invoke([[3, 2, 1]], 'sort')).to.eql([[1, 2, 3]]);
    let actual = _.invoke([[3, 2, 1], [4, 3, 2]], 'sort');
    let expected = [[1, 2, 3], [2, 3, 4]];
    expect(actual).to.eql(expected);
  });

  it('invokes the method given with the arguments provided', function () {
    let iteratee = function (e) { return e > 2;};
    let actual = _.invoke([[3, 2, 1], [4, 3, 2]], 'filter', iteratee);
    let expected = [[3], [4, 3]];
    expect(actual).to.eql(expected);
  });

  it('handles objects inputs', function () {
    let actual = _.invoke({1: 1, 2: 2}, 'toString');
    let expected = ['1', '2'];
    expect(actual).to.eql(expected);
  });

  it('handles invalid inputs', function () {
    expect(_.invoke()).to.eql([]);
    expect(_.invoke([3, 2])).to.eql([undefined, undefined]);
  });
});