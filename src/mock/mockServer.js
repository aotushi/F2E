
import Mock from 'mockjs'
import banner from './banner.json'
import cart from './cart.json'
import cartCheck from './cartCheck'
import cartDel from './cartDel.json'
import cartList from './cartList.json'
import detail from './detail.json'
import floor from './floor.json'
import search from './search.json'

Mock.mock('/mock/banner', {code:200, data:banner})
Mock.mock('/mock/floor', {code:200, data:floor})
Mock.mock('/mock/search', { code: 200, data: search })
Mock.mock('/mock/detail', { code: 200, data: detail })
Mock.mock(/\/mock\/cart\/addToCart\/\d+\/\d+/, {code:200, data: cart})
Mock.mock('/mock/cart/cartList', {code:200, data: cartList})
Mock.mock(/\/mock\/cart\/checkCart\/\d+\/\w+/, { code: 200, data: cartCheck })
Mock.mock(/\/mock\/cart\/deleteCart\/\d+/, {code:200, data:cartDel})


// https://github.com/nuysoft/Mock/wiki/Mock.mock()  文档
// /\/domain\/list\.json/
