/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.sortBy', function () {
  it('is a function', function () {
    expect(_.sortBy).to.be.a('function');
  });

  it('sorts an array in ascending order according to the result of passing every element through an iteratee', function () {
    let iteratee =  function (num) {return Math.sin(num);};
    let actual = _.sortBy([1, 2, 3, 4, 5, 6], iteratee);
    let expected = [5, 4, 6, 3, 1, 2];
    expect(actual).to.eql(expected);
  });

  it('sorts an object in ascending order according to the result of passing every element through an iteratee', function () {
    let iteratee =  function (num) {return Math.sin(num);};
    let actual = _.sortBy({1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6}, iteratee);
    let expected = [5, 4, 6, 3, 1, 2];
    expect(actual).to.eql(expected);
  });

  it('accepts a string as a second argument acting as a property to sort by', function () {
    let actual = _.sortBy([{name: 'foo'}, {name: 'bar'}, {name: 'xyzzy'}], 'name');
    let expected = [{name: 'bar'}, {name: 'foo'}, {name: 'xyzzy'}];
    expect(actual).to.eql(expected);
  });
});