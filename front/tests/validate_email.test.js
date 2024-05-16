import { assert } from 'chai';
import validateEmail from '../public/assets/validate_email.js';

describe('Аunction that verifies the correctness of the email', function () {
  it('appropriate email', function () {
    const expectedResult = true;
    const result = validateEmail('tarasov1812@gmail.com');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 1', function () {
    const expectedResult = true;
    const result = validateEmail('  person@yahoo.com');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 2', function () {
    const expectedResult = false;
    const result = validateEmail('the best@gmail.com');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 3', function () {
    const expectedResult = true;
    const result = validateEmail('rickymartin@gmx.net    ');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 4', function () {
    const expectedResult = false;
    const result = validateEmail('snoop@Dog@hotmail.com');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 5', function () {
    const expectedResult = false;
    const result = validateEmail('myemail');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 6', function () {
    const expectedResult = false;
    const result = validateEmail('reddit.com');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 7', function () {
    const expectedResult = false;
    const result = validateEmail('trytoimputemail@');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 8', function () {
    const expectedResult = false;
    const result = validateEmail('@yahoo.com');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 9', function () {
    const expectedResult = false;
    const result = validateEmail('MyEmailShouldBeCorrect@mail.corrects');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 10', function () {
    const expectedResult = false;
    const result = validateEmail('Dog@@@gmail.com');
    assert.equal(expectedResult, result);
  });

  it('appropriate email var 11', function () {
    const expectedResult = true;
    const result = validateEmail('elonMusk@tesla.com');
    assert.equal(expectedResult, result);
  });
});
