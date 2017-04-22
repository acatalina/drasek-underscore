/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.extend', function () {    
  it('is a function',function () {
    expect(_.extend).to.be.a('function');
  });

  it('returns the destination when no sources are provided', function () {
    expect(_.extend({'a': 1, 'b': 2})).to.eql({'a': 1, 'b': 2});   
  });

  it('copies the properties of the source object into the target object', function () {
    let actual = _.extend({}, {name: 'foo', age: 20});
    let expected = {name: 'foo', age: 20};
    expect(actual).to.eql(expected);
  });
  
  it('overwrites existing properties', function () {
    let actual = _.extend({name: 'foo'}, {name: 'bar', age: 20});
    let expected = {name: 'bar', age: 20};
    expect(actual).to.eql(expected);
  });
  
  it('copies properties from multiple source arguments', function () {
    let actual = _.extend({name: 'foo'}, {name: 'bar'}, {name: 'baz', age: 99});
    let expected = {name: 'baz', age: 99};
    expect(actual).to.eql(expected);
  });
  
  it('works for arrays', function () {
    let actual = _.extend([1, 2, 3], [4, 5, 6], {name: 'foo'});
    let expected = [4, 5, 6];
    expected.name = 'foo';
    expect(actual).to.eql(expected);
  });
});