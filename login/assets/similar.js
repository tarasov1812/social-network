import checkHashtag from './check_hashtag.js';

/**
 * The first version of the recommendation system
 * @param {*} profile object with unique 'id' and array of posts
 * @param {*} profiles array of profile object
 * @param {*} count required number of matches
 * @returns array of unique 'id's of the most suitable profiles
 */

export default function similar(profile, profiles, count) {
  // create empty array for objects with unique 'id' and numbers of matches
  const newProfiles = [];
  // extract all profile hashtags into an array using the imported function 'checkHashtag'
  const hashtagsProfile = checkHashtag(profile.posts);
  // Iterate through the array of profiles in search of hashtag that matches profile
  profiles.forEach((profileFromArray) => {
    // create variable for counting numbers of matches
    let numMatches = 0;
    // extract all profile's (from array) hashtags into an
    // array using the imported function 'checkHashtag'
    const hashtags = checkHashtag(profileFromArray.posts);
    // check every word from array
    hashtags.forEach((tag) => {
      // if it matches with pofiles any word, increase the counter by 1
      if (hashtagsProfile.includes(tag)) {
        numMatches += 1;
      }
    });

    // create costructor for profiles with unique id and numbers of matches
    function NewProfile(id, matches) {
      this.id = id;
      this.num = matches;
    }
    // create new profile with unique id and numbers of matches
    // for every profile that enters this cycle
    const newProfile = new NewProfile(profileFromArray.id, numMatches);

    // add every new profile to the array of profiles
    newProfiles.push(newProfile);
    // reset the counter value
    numMatches = 0;
  });

  // sort array of new Profile Objects by descending the number of matches
  newProfiles.sort((x, y) => y.num - x.num);

  // create an empty array for 'id's
  const arrayID = [];
  // iterate the array of new profiles the specified number of times
  // to add 'id's that has the largest number of matches
  for (let i = 0; i < count; i += 1) {
    arrayID.push(newProfiles[i].id);
  }
  // array of id of profiles to recomend
  return arrayID;
}
