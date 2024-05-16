import { assert } from 'chai';
import postSize from '../public/assets/post_size.js';

describe('The function of checking the calculation of the size of the post', function () {
  it('without links', function () {
    const expectedResult = 12;
    const result = postSize('Hello world!');
    assert.equal(expectedResult, result);
  });

  it('without links var 1', function () {
    const expectedResult = 6;
    const result = postSize('Hello wwww.google.com');
    assert.equal(expectedResult, result);
  });

  it('without links var 2', function () {
    const expectedResult = 27;
    const result = postSize('https://github.com web-servise for developers');
    assert.equal(expectedResult, result);
  });

  it('without links var 3', function () {
    const expectedResult = 32;
    const result = postSize('You can make an order at https://www.amazon.com or at www.amazon.com');
    assert.equal(expectedResult, result);
  });

  it('without links var 4', function () {
    const expectedResult = 0;
    const result = postSize('reddit.com');
    assert.equal(expectedResult, result);
  });

  it('without links var 5', function () {
    const expectedResult = 22;
    const result = postSize('Check out a new video https://www.youtube.com/watch?v=jZGpkLElSu8');
    assert.equal(expectedResult, result);
  });

  it('without links var 6', function () {
    const expectedResult = 51;
    const result = postSize('Click here to buy a new coffee machine https://www.walmart.com/browse/home/coffee-makers/4044_90548_90546_1115306_5438660 looks nice!');
    assert.equal(expectedResult, result);
  });

  it('without links var 7', function () {
    const expectedResult = 4;
    const result = postSize('WOW https://www.youtube.com/watch?v=jUlT-zQ-mbk');
    assert.equal(expectedResult, result);
  });

  it('without links var 8', function () {
    const expectedResult = 14;
    const result = postSize('You are welcom');
    assert.equal(expectedResult, result);
  });

  it('without links var 9', function () {
    const expectedResult = 12;
    const result = postSize('LookAtTHAT! https://twitter.com/i/topics/808713037230157824');
    assert.equal(expectedResult, result);
  });

  it('without links var 10', function () {
    const expectedResult = 21;
    const result = postSize('https://en.wikipedia.org/wiki/Peru   -   interesting...');
    assert.equal(expectedResult, result);
  });

  it('without links var 11', function () {
    const expectedResult = 5;
    const result = postSize('great');
    assert.equal(expectedResult, result);
  });
});
