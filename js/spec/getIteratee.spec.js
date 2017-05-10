/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.getIteratee', function () {
  it('is a function', function () {
    expect(_.getIteratee).to.be.a('function');
  });

  it('returns the same function if a function is given', function () {
    let iteratee = function (e) { return e; };
    expect(_.getIteratee(iteratee)).to.equal(iteratee);
  });

  it('returns a function that returns the method of an elem when a string is given', function () {
    let iteratee = 'toString';
    let actual = _.getIteratee(iteratee);
    let expected = function (elem) {
      return elem[iteratee];
    };
    expect(actual(1)).to.equal(expected(1));
  });

  it('returns a function that returns what is given when method is not a function or a string', function () {
    let iteratee = null;
    let actual = _.getIteratee(iteratee)(undefined);
    let expected;
    expect(actual).to.equal(expected);
  });
});
