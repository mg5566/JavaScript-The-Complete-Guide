// 교집합
Set.prototype.intersection = function (set) {
  const result = new Set();

  for (const value of set) {
    if (this.has(value)) result.add(value);
  }

  return result;

  /**
   * 이런 방법도 존재함
   *
   * return new Set([...this].filter(v => set.has(v)));
   *
   * 나는 주석의 코드 스타일은 별로 같음. 걍 위에가 더 좋음
   */
}

const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 5]);
console.log('set A 교집합 set B', setA.intersection(setB));  // set(1) { 3 }
console.log('set B 교집합 set A', setB.intersection(setA));  // set(1) { 3 }

// 합집합
Set.prototype.union = function (set) {
  const result = new Set(this);

  for (const value of set) {
    result.add(value);
  }

  return result;

  /**
   * 이런 방법도 존재함
   *
   * return new Set([...this, ...set]);
   *
   * 이번에는 주석의 코드가 더 좋아보임
   */
}

// 차집합
Set.prototype.differnce = function (set) {
  const result = new Set(this);

  for (const value of set) {
    if (this.has(value)) result.delete(value);
  }

  return result;

  /**
   * return new Set([...this].filter(v => !set.has(v)));
   *
   * ...this 를 변수로 분리하고, filter method 를 동작시켜야 더 좋은 코드라고 생각된다.
   */
}

// 부분 집합 subSet & 상위 집합 superSet
Set.prototype.isSuperSet = function (subSet) {
  for (const value of subSet) {
    if (!this.has(value)) return false;
  }
  return true;
}