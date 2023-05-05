// pages/movies/movies.js
const app = getApp()
/**
 * 
 * 豆瓣api
 * https://www.doubanapi.com/movie.html#in_theaters
 * https://api.wmdb.tv/
 * https://feizhaojun.com/?p=3813
 * 
 * 
 */
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
    searchResult: false,
    searchData: [],
    errorMsg: '',
    searchWord: ''
  },
  showMessage2(val) {
    wx.lin.showMessage({
      duration: 3000,
      type: 'warning',
      content: `${val}`
    })
  },
  /**
   * 生命周期函数——监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      // url: app.gBaseUrl+'in_theaters',
      url: "https://api.suime.cn/api/douban?type=1",
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        let data = res.data.data.map(item => ({
          name: item.title,
          imgUrl: item.cover,
          rate: item.rate,
          doubanId: item.id
        }))
        this.setData({
          inTheaters: data.splice(0,6)
        })
      }
    })
    wx.request({
      // url: app.gBaseUrl+'coming_soon',
      url: "https://api.suime.cn/api/douban?type=2",
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        let data = res.data.data.map(item => ({
          name: item.title,
          imgUrl: item.cover,
          rate: item.rate,
          doubanId: item.id
        }))
        this.setData({
          comingSoon: data.splice(0,6)
        })
      }
    })
    wx.request({
      // url: app.gBaseUrl+'top250',
      url: "https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=50&lang=Cn",
      data: {
        start: 0,
        count: 3
      },
      success: (res) => {
        // const {} = res.data
        let data = res.data.map(items => ({
          rate: items.doubanRating,
          imgUrl: items.data[0].poster,
          name: items.data[0].name,
          doubanId: items.doubanId
        }))
        console.log('data', data)
        this.setData({
          top250: data.splice(0,6)
        })
      }
    })
  },
  onGotoMore(event) {
    console.log(event)
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + type,
    })
  },
  onConfirm(event) {
    // event.detail.value
    this.setData({
      searchResult: true,
      searchWord: event.detail.value
    })
    if (event.detail.value === this.data.search) {
      return
    }
    wx.request({
      // url: app.gBaseUrl+'search',
      url: `https://api.wmdb.tv/api/v1/movie/search?q=${event.detail.value}`,
      data: {
        q: event.detail.value
      },
      success: (res) => {
        console.log('res', res)
        let data;
        if (Array.isArray(res.data)) {
          if (res.data.length === 0) {
           this.showMessage2('没有查询到相关电影')
          }
          data = res.data.map(item => ({
            name: item.data[0].name,
            imgUrl: item.data[0].poster,
            rate: item.doubanRating
          }))
        } else {
          this.showMessage2('30秒内只能查1次')
        }

        this.setData({
          searchData: data
        })
      },
    })
  },
  onSearchCancel(event) {
    this.setData({
      searchResult: false
    })
  },
  /**
   * 生命周期函数——监听页面初次渲染完成
   */
  onReady: function () {},
  /**
   * 生命周期函数——监听页面显示
   */
  onShow: function () {},
  /**
   * 生命周期函数——监听页面隐藏
   */
  onHide: function () {},
  /**
   * 生命周期函数——监听页面卸载
   */
  onUnload: function () {},
  /**
   * 页面相关事件处理函数——监听用户下拉动作
   */
  onPullDownRefresh: function () {},
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
})