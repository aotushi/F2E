
import Mock from 'mockjs'
import banner from './banner.json'
import detail from './detail.json'
import floor from './floor.json'
import search from './search.json'

Mock.mock('/mock/banner', {code:200, data:banner})
Mock.mock('/mock/floor', {code:200, data:floor})
Mock.mock('/mock/search', { code: 200, data: search })
Mock.mock('/mock/detail', {code:200, data:detail})
