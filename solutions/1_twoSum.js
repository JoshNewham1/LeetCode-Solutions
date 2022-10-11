// Using a sorted array and nested loops
// Breaks out whenever the numbers become too high
// Time - 175ms
// Memory - 43.7MB
// Most of the performance issues lie in the deep clone needed on line 7
const twoSum_1 = function (nums, target) {
  const sorted = [...nums].sort((a, b) => a - b);
  const getOriginalIndex = (i) => {
    const originalIndex = nums.findIndex((val) => val === i);
    nums[originalIndex] = null;
    return originalIndex;
  };

  for (let i = 0; i < sorted.length; i++) {
    let currentSum = sorted[i];
    for (let j = i + 1; j < sorted.length; j++) {
      if (sorted[j] > target - sorted[i]) {
        break;
      }
      currentSum += sorted[j];
      if (currentSum === target) {
        return [getOriginalIndex(sorted[i]), getOriginalIndex(sorted[j])];
      }
      currentSum = sorted[i];
    }
  }
  return [];
};

console.log("Approach 1:");
console.log(twoSum_1([2, 7, 11, 15], 9));
console.log(twoSum_1([3, 2, 4], 6));

// Using a hash map with the value -> indices and searching for a difference value
// that will make the target number. Populating hash map in same loop as search
// Time - 106ms
// Memory - 43.7MB
const twoSum_2 = function (nums, target) {
  const indices = new Map();

  for (let i = 0; i < nums.length; i++) {
    const difference = target - nums[i];
    if (indices.has(difference)) {
      return [indices.get(difference), i];
    }
    indices.set(nums[i], i);
  }
};

console.log("Approach 2:");
console.log(twoSum_2([2, 7, 11, 15], 9));
console.log(twoSum_2([3, 2, 4], 6));
