import { assert } from 'chai';
import timeConverter from '../public/assets/time_converter.js';

describe('Сheck the conversion of the number into time', function () {
  it('with exacly one minute', function () {
    const expectedResult = '1 minute ago';
    const result = timeConverter(1);
    assert.equal(expectedResult, result);
  });

  it('with 30 in minutes in plural', function () {
    const expectedResult = '30 minutes ago';
    const result = timeConverter(30);
    assert.equal(expectedResult, result);
  });

  it('with exacly one hour', function () {
    const expectedResult = '1 hour ago';
    const result = timeConverter(60);
    assert.equal(expectedResult, result);
  });

  it('with 0', function () {
    const expectedResult = 'now';
    const result = timeConverter(0);
    assert.equal(expectedResult, result);
  });

  it('with exacly one day', function () {
    const expectedResult = '1 day ago';
    const result = timeConverter(1570);
    assert.equal(expectedResult, result);
  });

  it('with big number', function () {
    const expectedResult = 'over one year ago';
    const result = timeConverter(100000000);
    assert.equal(expectedResult, result);
  });

  it('with 300', function () {
    const expectedResult = '5 hours ago';
    const result = timeConverter(300);
    assert.equal(expectedResult, result);
  });

  it('with 3000', function () {
    const expectedResult = '2 days ago';
    const result = timeConverter(3000);
    assert.equal(expectedResult, result);
  });

  it('with 5', function () {
    const expectedResult = '5 minutes ago';
    const result = timeConverter(5);
    assert.equal(expectedResult, result);
  });

  it('with 59', function () {
    const expectedResult = '59 minutes ago';
    const result = timeConverter(59);
    assert.equal(expectedResult, result);
  });
});
