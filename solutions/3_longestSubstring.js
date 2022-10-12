// https://leetcode.com/problems/longest-substring-without-repeating-characters

// Go character by character along the string, adding it and its index i to the map
// When a character repeats, check it against the current longest, replace if longer and then try again from i + 1
// Time - 323ms
// Memory - 49.2MB
/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLongestSubstring_1 = function (s) {
  const chars = new Map();
  let currentLongest = "";
  let currentSubstring = "";
  for (let i = 0; i < s.length; i++) {
    // Repeated character
    if (chars.has(s[i])) {
      i = chars.get(s[i]) + 1;
      currentSubstring = "";
      chars.clear();
    }
    chars.set(s[i], i);
    currentSubstring += s[i];
    if (currentSubstring.length > currentLongest.length) {
      currentLongest = currentSubstring;
    }
  }
  return currentLongest.length;
};

console.log("Approach 1:");
console.log(lengthOfLongestSubstring_1("dvdf"));
console.log(lengthOfLongestSubstring_1("bbbbb"));
console.log(lengthOfLongestSubstring_1("pwwkew"));

// "Sliding window approach" - go through the string until you find a repeated character
// Then delete characters from the front of the string until you reach the repeated character
// Then carry on
// For example: "dvdf" -> ("d", "v"), found repeated "d", remove from front until found "d", ("v", "d"), ("v", "d", "f")
// Time - 97ms
// Memory - 46.4MB
const lengthOfLongestSubstring_2 = function (s) {
  const set = new Set();
  let start = 0;
  let maxSize = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    // Pop characters from the front of the string until we reach the repeated char
    while (set.has(c)) {
      set.delete(s[start]);
      start += 1;
    }

    // Add current character to set, update max size
    maxSize = Math.max(maxSize, i - start + 1);
    set.add(c);
  }
  return maxSize;
};

console.log("Approach 2:");
console.log(lengthOfLongestSubstring_2("dvdf"));
console.log(lengthOfLongestSubstring_2("bbbbb"));
console.log(lengthOfLongestSubstring_2("pwwkew"));
