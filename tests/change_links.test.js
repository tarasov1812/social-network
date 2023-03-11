import { assert } from 'chai';
import changeLikns from '../public/assets/change_links.js';

describe('check if the link is being replaced with the htmlcode correctly', function () {
  it('change links correctly', function () {
    const expectedResult = 'Hello world!';
    const result = changeLikns('Hello world!');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 1', function () {
    const expectedResult = 'Hello <a href="wwww.google.com">wwww.google.com</a>';
    const result = changeLikns('Hello wwww.google.com');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 2', function () {
    const expectedResult = '<a href="https://github.com">https://github.com</a> web-servise for developers';
    const result = changeLikns('https://github.com web-servise for developers');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 3', function () {
    const expectedResult = 'You can make an order at <a href="https://www.amazon.com">https://www.amazon.com</a> or at <a href="www.amazon.com">www.amazon.com</a>';
    const result = changeLikns('You can make an order at https://www.amazon.com or at www.amazon.com');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 4', function () {
    const expectedResult = '<a href="reddit.com">reddit.com</a>';
    const result = changeLikns('reddit.com');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 5', function () {
    const expectedResult = 'Check out a new video <a href="https://www.youtube.com/watch?v=jZGpkLElSu8">https://www.youtube.com/watch?v=jZGpkLElSu8</a>';
    const result = changeLikns('Check out a new video https://www.youtube.com/watch?v=jZGpkLElSu8');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 6', function () {
    const expectedResult = 'Click here to buy a new coffee machine <a href="https://www.walmart.com/browse/home/coffee-makers/4044_90548_90546_1115306_5438660">https://www.walmart.com/browse/home/coffee-makers/4044_90548_90546_1115306_5438660</a> looks nice!';
    const result = changeLikns('Click here to buy a new coffee machine https://www.walmart.com/browse/home/coffee-makers/4044_90548_90546_1115306_5438660 looks nice!');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 7', function () {
    const expectedResult = 'WOW <a href="https://www.youtube.com/watch?v=jUlT-zQ-mbk">https://www.youtube.com/watch?v=jUlT-zQ-mbk</a>';
    const result = changeLikns('WOW https://www.youtube.com/watch?v=jUlT-zQ-mbk');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 8', function () {
    const expectedResult = 'You are welcom';
    const result = changeLikns('You are welcom');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 9', function () {
    const expectedResult = 'LookAtTHAT! <a href="https://twitter.com/i/topics/808713037230157824">https://twitter.com/i/topics/808713037230157824</a>';
    const result = changeLikns('LookAtTHAT! https://twitter.com/i/topics/808713037230157824');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 10', function () {
    const expectedResult = '<a href="https://en.wikipedia.org/wiki/Peru">https://en.wikipedia.org/wiki/Peru</a>   -   interesting...';
    const result = changeLikns('https://en.wikipedia.org/wiki/Peru   -   interesting...');
    assert.equal(expectedResult, result);
  });

  it('change links correctly var 11', function () {
    const expectedResult = 'great';
    const result = changeLikns('great');
    assert.equal(expectedResult, result);
  });
});
