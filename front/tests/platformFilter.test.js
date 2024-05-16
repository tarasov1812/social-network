import { assert } from 'chai';
import platformFilter from '../public/assets/platform_filter.js';

describe('The function checks whether the word from the message is correctly replaced ', function () {
  it('in Russian language with one word in the second argument', function () {
    const expectedResult = 'Да вы что?? ****** там?';
    const result = platformFilter('Да вы что?? Охуели там?', ['охуели']);
    assert.equal(expectedResult, result);
  });
  it('with 2 words in the second argument', function () {
    const expectedResult = 'Shut the **** up *******!';
    const result = platformFilter('Shut the fuck up asshole!', ['fuck', 'asshole']);
    assert.equal(expectedResult, result);
  });
  it('with 2 words in the second argument and different case', function () {
    const expectedResult = 'Shut the **** up *******!';
    const result = platformFilter('Shut the fuCk up assHole!', ['fuck', 'asshole']);
    assert.equal(expectedResult, result);
  });
  it('with 2 words in the second argument and extra simbols', function () {
    const expectedResult = 'Shut the !**** up *******$$!';
    const result = platformFilter('Shut the !fuck up asshole$$!', ['fuck', 'asshole']);
    assert.equal(expectedResult, result);
  });
  it('with repeated words', function () {
    const expectedResult = '**** **** ************ ******* ok!';
    const result = platformFilter('FUCK fuck FUCKFUCKFUCK asshole ok!', ['fuck', 'asshole']);
    assert.equal(expectedResult, result);
  });
  it('with 2 swear words in one word', function () {
    const expectedResult = '*********!';
    const result = platformFilter('Fuckbitch!', ['fuck', 'bitch']);
    assert.equal(expectedResult, result);
  });
  it('with swear word in plural', function () {
    const expectedResult = 'They Killed Kenny! You *******s!';
    const result = platformFilter('They Killed Kenny! You Bastards!', ['bastard']);
    assert.equal(expectedResult, result);
  });
  it('with swear word inside normal word', function () {
    const expectedResult = 'Today I was at the mus******seum';
    const result = platformFilter('Today I was at the musNiggerseum', ['nigger']);
    assert.equal(expectedResult, result);
  });
  it('with one swear word', function () {
    const expectedResult = 'You know I cant remember all that ****';
    const result = platformFilter('You know I cant remember all that shit', ['shit', 'bastard', 'asshole']);
    assert.equal(expectedResult, result);
  });
  it('without swear words', function () {
    const expectedResult = 'What a nice day today!';
    const result = platformFilter('What a nice day today!', ['shit', 'bastard', 'asshole']);
    assert.equal(expectedResult, result);
  });
});
