import { assert } from 'chai';
import lightHashtag from '../public/assets/light_hashtag.js';

describe('check if the hashtag replaced with html code correctly', function () {
  it('when \'#\' doesnt connect to any word', function () {
    const expectedResult = 'Hello # world! #';
    const result = lightHashtag('Hello # world! #');
    assert.equal(expectedResult, result);
  });

  it('with only \'#\' simbols without ', function () {
    const expectedResult = '#####';
    const result = lightHashtag('#####');
    assert.equal(expectedResult, result);
  });

  it('with regular tag at the end of a senctence', function () {
    const expectedResult = 'Who else is learning <a href="/search?tag=javascript">#javascript</a>?';
    const result = lightHashtag('Who else is learning #javascript?');
    assert.equal(expectedResult, result);
  });

  it('with \'#\' simbol inside the word', function () {
    const expectedResult = 'Did I make a Hash#tag?';
    const result = lightHashtag('Did I make a Hash#tag?');
    assert.equal(expectedResult, result);
  });

  it('with regular tag at the end and the begining of a senctence', function () {
    const expectedResult = '<a href="/search?tag=javascript">#javascript</a> Who else is learning <a href="/search?tag=javascript">#javascript</a> ?';
    const result = lightHashtag('#javascript Who else is learning #javascript ?');
    assert.equal(expectedResult, result);
  });

  it('with simbol \'#\' at the end of the word', function () {
    const expectedResult = 'tag# and tag';
    const result = lightHashtag('tag# and tag');
    assert.equal(expectedResult, result);
  });

  it('with 3 simbols \'###\' at the begining of the word', function () {
    const expectedResult = '###whatsup';
    const result = lightHashtag('###whatsup');
    assert.equal(expectedResult, result);
  });

  it('with 3 regular tag', function () {
    const expectedResult = '<a href="/search?tag=javascript">#javascript</a> <a href="/search?tag=javascript">#javascript</a> <a href="/search?tag=javascript">#javascript</a>';
    const result = lightHashtag('#javascript #javascript #javascript');
    assert.equal(expectedResult, result);
  });

  it('with proibided simbols', function () {
    const expectedResult = '#<>%ups#';
    const result = lightHashtag('#<>%ups#');
    assert.equal(expectedResult, result);
  });

  it('with allowed simbols', function () {
    const expectedResult = '<a href="/search?tag=make_america_great_again">#make_america_great_again</a>';
    const result = lightHashtag('#make_america_great_again');
    assert.equal(expectedResult, result);
  });

  it('with \'#\' at the begining and at the middle of the word', function () {
    const expectedResult = '<a href="/search?tag=_co">#_co</a>#de';
    const result = lightHashtag('#_co#de');
    assert.equal(expectedResult, result);
  });

  it('with email adress', function () {
    const expectedResult = '<a href="/search?tag=tarasov1812">#tarasov1812</a>@gmail.com';
    const result = lightHashtag('#tarasov1812@gmail.com');
    assert.equal(expectedResult, result);
  });

  it('with \'!\' simbol', function () {
    const expectedResult = '<a href="/search?tag=HelloWorld">#HelloWorld</a>!';
    const result = lightHashtag('#HelloWorld!');
    assert.equal(expectedResult, result);
  });
});
