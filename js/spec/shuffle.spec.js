/* global describe, it */
const path = require('path');
const {expect} = require('chai');
const _ = require(path.join(__dirname, '..', 'underscore'));
var {range} = require('underscore');

describe('_.shuffle', function () {
  it('is a function', function () {
    expect(_.shuffle).to.be.a('function');
  });

  it('handles invalid inputs returning an empty array', function () {
    expect(_.shuffle()).to.eql([]);
    expect(_.shuffle(2)).to.eql([]);
    expect(_.shuffle(NaN)).to.eql([]);
  });  

  it('shuffles the content of an array', function () {
    let input = range(100);
    let res = _.shuffle(input);
    let res2 = _.shuffle(input);
    
    let firstShuffle = res[0] + res[1];
    let secondShuffle = res2[0] + res2[1];
    expect(firstShuffle).to.not.equal(secondShuffle);
  });

  it('returns an array with shuffled values of an object', function () {
    let input = range(100);
    input = input.reduce((res, e, i) => {
      res[i] = e;
      return res;
    }, {});
    let res = _.shuffle(input);
    let res2 = _.shuffle(input);

    let firstShuffle = res[0] + res[1];
    let secondShuffle = res2[0] + res2[1];
    expect(firstShuffle).to.not.equal(secondShuffle);
    expect(res).to.be.an('array');
  });
});