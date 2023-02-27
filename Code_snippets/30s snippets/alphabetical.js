/*
title: Sort array alphabetically
tags: array
author: chalarangelo
cover: boutique-home-office-1
firstSeen: 2023-02-15T05:00:00-04:00
*/

// 基于给定的属性来排序字母表对象的数组

// example
const people = [{ name: "john" }, { name: "adam" }, { name: "mary" }];

alphabetical(people, (g) => g.name); // [ { name: 'Adam' }, { name: 'John' }, { name: 'Mary' } ]

// people.sort((a,b) => a.name.localCompare(b.name, undefined, {sensitivity: 'base}))
