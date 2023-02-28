---
title: Consecutive element subarrays
tags: array
author: chalarangelo
cover: camera-zoom
firstSeen: 2020-05-13T13:25:33+03:00
lastUpdated: 2020-10-18T20:24:28+03:00
---

创建多元连续元素的数组

例子:
```js
aperture(2, [1,2,3,4]) //[[1,2],[2,3,],[3,4]]
aperture(3, [1, 2, 3, 4]); // [[1, 2, 3], [2, 3, 4]]
aperture(5, [1, 2, 3, 4]); // []
```

const aperture = (arr, n) => {
  if (n > arr.length) {
    return []
  }
  <!-- return arr.reduce((acc, crt, idx) => {
    return idx < (n-1)
      ? acc.push([crt]) && acc
      : acc.push([crt]) && acc
  }, []) -->



  
}
