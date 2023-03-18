import { assert } from 'chai';
import similar from '../public/assets/similar.js';

describe('Сhecking the correctness of the id selection that matches the most', function () {
  it('with array of 2 profiles and 1 id as result', function () {
    const profile = {
      id: 256,
      posts: [
        'Hi. #Today I was at a band concert #linkinpark',
        'how do you like the new song #linkinpark',
      ],
    };

    const profiles = [
      {
        id: 257,
        posts: [
          'A new version of #javascript has been released today',
          'how do you like the new version of #javascript?'],
      },
      {
        id: 258,
        posts: [
          '#Today I didnt like the new song #linkinpark'],
      },
    ];

    const count = 1;

    const expectedResult = [258].toString();
    const result = similar(profile, profiles, count).toString();
    assert.equal(expectedResult, result);
  });
  it('with array of 2 profiles and 2 id as result', function () {
    const profile = {
      id: 256,
      posts: [
        'Hi. #Today I was at a band concert #linkinpark',
        'how do you like the new song #linkinpark',
      ],
    };

    const profiles = [
      {
        id: 257,
        posts: [
          'A new version of #javascript has been released today',
          'how do you like the new version of #javascript?'],
      },
      {
        id: 258,
        posts: [
          '#Today I didnt like the new song #linkinpark'],
      },
    ];

    const count = 2;

    const expectedResult = [258, 257].toString();
    const result = similar(profile, profiles, count).toString();
    assert.equal(expectedResult, result);
  });

  it('with array of 4 profiles and 4 id as result', function () {
    const profile = {
      id: 256,
      posts: [
        'Hi. #Today #Yesterday #Tommorow I was at a band concert #linkinpark',
        'how do you like the new song #linkinpark',
      ],
    };

    const profiles = [
      {
        id: 257,
        posts: [
          'A new version of #javascript has been released #Today',
          'how do you like the new version of #javascript?'],
      },
      {
        id: 258,
        posts: [
          'I didnt like the new song'],
      },
      {
        id: 259,
        posts: [
          '#Yesterday #Today #Tommorow I didnt like the new song #linkinpark'],
      },
      {
        id: 260,
        posts: [
          '#Today I didnt like the new song #linkinpark #Tommorow'],
      },
    ];

    const count = 4;

    const expectedResult = [259, 260, 257, 258].toString();
    const result = similar(profile, profiles, count).toString();
    assert.equal(expectedResult, result);
  });

  it('with array of 5 profiles and 2 id as result', function () {
    const profile = {
      id: 256,
      posts: [
        'Hi. #Today #Yesterday #Tommorow I was at a band concert #linkinpark',
        'how do you like the new song #linkinpark',
      ],
    };

    const profiles = [
      {
        id: 257,
        posts: [
          'A new version of #javascript has been released #Today',
          'how do you like the new version of #javascript?'],
      },
      {
        id: 258,
        posts: [
          'I didnt like the new song #Today',
          'I didnt like the new song #Yesterday',
          'I didnt like the new song  #Tommorow',
          'I didnt like the new song #linkinpark'],
      },
      {
        id: 259,
        posts: [
          'I didnt like the new song #linkinpark'],
      },
      {
        id: 260,
        posts: [
          '#Today I didnt like the new song #linkinpark'],
      },
      {
        id: 261,
        posts: [
          '#Today #Yesterday I didnt like the new song #linkinpark'],
      },
    ];

    const count = 2;

    const expectedResult = [258, 261].toString();
    const result = similar(profile, profiles, count).toString();
    assert.equal(expectedResult, result);
  });

  it('with array of 6 profiles and 6 id as result', function () {
    const profile = {
      id: 1,
      posts: [
        '#Hello world!',
        '#Good morninig  world ####!',
        '#Whatsup!',
        '#Nice to meet you!',
        '#You are welcom!',
        '#WOW!',
      ],
    };

    const profiles = [
      {
        id: 2,
        posts: [
          '#WOW I bought a new iphone',
          'It looks #Nice',
          'morninig  world ####',
          'are welcom!',
          '#Nice to meet you!'],
      },
      {
        id: 3,
        posts: [
          '#Hello world! #Today',
          '#Hello world! #Yesterday',
          '#Hello world!  #Tommorow',
          '#Hello world! #linkinpark'],
      },
      {
        id: 4,
        posts: [
          '#### #### #### #### #### #### #### #### #### ####',
          '#### #### #### #### #### #### #### #### #### ####',
          '#### #### #### #### #### #### #### #### #### ####'],
      },
      {
        id: 5,
        posts: [
          '#Whatsup! #Whatsup! #Whatsup! #Whatsup! #Whatsup!'],
      },
      {
        id: 6,
        posts: [
          '#You are welcom!',
          '#WOW I am the one!'],
      },
      {
        id: 7,
        posts: [
          '#Nice to meet you!'],
      },
    ];

    const count = 6;

    const expectedResult = [5, 3, 2, 6, 7, 4].toString();
    const result = similar(profile, profiles, count).toString();
    assert.equal(expectedResult, result);
  });
});
