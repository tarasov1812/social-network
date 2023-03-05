import { assert } from 'chai';
import postSize from '../public/assets/post_size.js';

describe('The function of checking the calculation of the size of the post', function () {
  it('without links', function () {
    const expectedResult = 12;
    const result = postSize('Hello world!');
    assert.equal(expectedResult, result);
  });
});
