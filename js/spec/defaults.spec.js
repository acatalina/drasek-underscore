/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));

describe('_.defaults', function () {
  it('is a function', function () {
    expect(_.defaults).to.be.a('function');
  });

  it('handles invalid inputs', function () {
    expect(_.defaults()).to.equal(undefined);
    expect(_.defaults(false)).to.equal(false);
    expect(_.defaults([1])).to.eql([1]);
  });

  it('returns the object if no defaults is given', function () {
    let actual = _.defaults({name: 'foo'});
    let expected = {name: 'foo'};
    expect(actual).to.eql(expected);
  });

  it('copies the missing properties from defaults object to object', function () {
    let actual = _.defaults({name: 'foo'}, {surname: 'bar'});
    let expected = {name: 'foo', surname: 'bar'};
    expect(actual).to.eql(expected);

    actual = _.defaults({name: undefined}, {name: 'foo'});
    expected = {name: 'foo'};
    expect(actual).to.eql(expected);
  });

  it('does not overwrites properties from default object on object', function () {
    let expected = _.defaults({name: 'foo', surname: 'bar'}, {surname: 'baz'});
    let actual = {name: 'foo', surname: 'bar'};
    expect(actual).to.eql(expected);
  });
});
