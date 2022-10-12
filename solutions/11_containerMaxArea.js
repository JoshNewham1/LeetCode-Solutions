// https://leetcode.com/problems/container-with-most-water/

// Naive approach with nested loops comparing every line to every other line
// Time limit exceeded on large input
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea_1 = function (height) {
  let max = 0;
  for (let i = 0; i < height.length; i++) {
    for (let j = i + 1; j < height.length; j++) {
      const containerHeight = Math.min(height[i], height[j]);
      const containerArea = containerHeight * (j + 1 - (i + 1));
      max = Math.max(containerArea, max);
    }
  }
  return max;
};

console.log("Approach 1:");
console.log(maxArea_1([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea_1([1, 1]));
console.log(maxArea_1([4, 3, 2, 1, 4]));

// Faster approach using left and right pointers
// Move whichever pointer has the smaller height as it is the limiting factor,
// keeping track of the maximum area
// Time - 147ms
// Memory - 49.4MB
var maxArea_2 = function (height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;
  while (left < right) {
    // This intermediate variable was added for readability, removing it greatly improves performance to 86ms
    const currentArea = (right - left) * Math.min(height[left], height[right]);
    max = Math.max(max, currentArea);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return max;
};

console.log("Approach 2:");
console.log(maxArea_2([1, 8, 6, 2, 5, 4, 8, 3, 7]));
console.log(maxArea_2([1, 1]));
console.log(maxArea_2([4, 3, 2, 1, 4]));
