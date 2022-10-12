// Test cases:
// 1. No palindrome
// 2. Palindrome is of the same characters (e.g. "cbbd")
// 3. Palindrome is of all different character (e.g. "kayak")

// When we encounter a repeated letter, start backtracking and checking for palindromes
// Time - 7438ms (pretty terrible thanks to the while loop triggering at all duplicate letters)
// Memory - 48.4MB

/**
 * @param {string} s
 * @return {string}
 */
const isPalindrome = function (s) {
  let reversed = "";
  for (let i = s.length - 1; i >= 0; i--) {
    reversed += s[i];
  }
  return reversed === s;
};
/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome_1 = function (s) {
  const set = new Set();
  let longestPalindrome = s[0];
  let substring = "";
  let front = 0;
  for (let i = 0; i < s.length; i++) {
    substring = substring += s[i];
    while (set.has(s[i]) && front <= i) {
      if (
        substring[0] === substring[substring.length - 1] && // Don't check unless start letter == end letter
        isPalindrome(substring) &&
        substring.length > longestPalindrome.length
      ) {
        longestPalindrome = substring;
        break;
      }
      front += 1;
      substring = s.slice(front, i + 1);
    }
    // Return to looking at the whole word
    front = 0;
    substring = s.slice(0, i + 1);
    set.add(s[i]);
  }
  return longestPalindrome;
};

console.log("Approach 1:");
console.log(longestPalindrome_1("a"));
console.log(longestPalindrome_1("babad"));
console.log(longestPalindrome_1("cbbd"));
console.log(longestPalindrome_1("levelracecar"));
console.log(
  longestPalindrome_1(
    "kztakrekvefgchersuoiuatzlmwynzjhdqqftjcqmntoyckqfawikkdrnfgbwtdpbkymvwoumurjdzygyzsbmwzpcxcdmmpwzmeibligwiiqbecxwyxigikoewwrczkanwwqukszsbjukzumzladrvjefpegyicsgctdvldetuegxwihdtitqrdmygdrsweahfrepdcudvyvrggbkthztxwicyzazjyeztytwiyybqdsczozvtegodacdokczfmwqfmyuixbeeqluqcqwxpyrkpfcdosttzooykpvdykfxulttvvwnzftndvhsvpgrgdzsvfxdtzztdiswgwxzvbpsjlizlfrlgvlnwbjwbujafjaedivvgnbgwcdbzbdbprqrflfhahsvlcekeyqueyxjfetkxpapbeejoxwxlgepmxzowldsmqllpzeymakcshfzkvyykwljeltutdmrhxcbzizihzinywggzjctzasvefcxmhnusdvlderconvaisaetcdldeveeemhugipfzbhrwidcjpfrumshbdofchpgcsbkvaexfmenpsuodatxjavoszcitjewflejjmsuvyuyrkumednsfkbgvbqxfphfqeqozcnabmtedffvzwbgbzbfydiyaevoqtfmzxaujdydtjftapkpdhnbmrylcibzuqqynvnsihmyxdcrfftkuoymzoxpnashaderlosnkxbhamkkxfhwjsyehkmblhppbyspmcwuoguptliashefdklokjpggfiixozsrlwmeksmzdcvipgkwxwynzsvxnqtchgwwadqybkguscfyrbyxudzrxacoplmcqcsmkraimfwbauvytkxdnglwfuvehpxd"
  )
);

// Use a left and right pointer and check palindromes between them
// Keep expanding in each direction while there are palindromes until there are none
// Do this for every letter in the string
// Time - 86ms
// Memory - 43.4MB
/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome_2 = function (s) {
  let longestPalindrome = s[0];

  // Helper function to get longest palindrome between two indices
  const getLongestPalindrome = function (leftPos, rightPos) {
    while (leftPos >= 0 && rightPos < s.length && s[leftPos] === s[rightPos]) {
      // Expand in both directions while there are palindromes
      leftPos--;
      rightPos++;
    }
    // Store if longest palindrome we've found yet
    if (rightPos - leftPos > longestPalindrome.length) {
      longestPalindrome = s.slice(leftPos + 1, rightPos);
    }
  };

  for (let i = 0; i < s.length; i++) {
    getLongestPalindrome(i, i + 1);
    getLongestPalindrome(i, i);
  }

  return longestPalindrome;
};
console.log("Approach 2:");
console.log(longestPalindrome_2("a"));
console.log(longestPalindrome_2("babad"));
console.log(longestPalindrome_2("cbbd"));
console.log(longestPalindrome_2("levelracecar"));
