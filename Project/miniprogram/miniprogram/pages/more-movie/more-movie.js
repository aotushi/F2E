// pages/more-movie/more-movie.js
const requestType = {
  'in_theaters': 'https://api.suime.cn/api/douban?type=1',
  'coming_soon': 'https://api.suime.cn/api/douban?type=2',
  'top250': 'https://api.wmdb.tv/api/v1/top?type=Imdb&skip=0&limit=70&lang=Cn'
}
Page({

  /**
   * Page initial data
   */
  data: {
    movies: [],
    _type: ''
  },
  handleJson(res) {
    let result;
    if (this.data._type === 'top250') {
      result = res.map(items => ({
        rate: items.doubanRating,
        imgUrl: items.data[0].poster,
        name: items.data[0].name
      }))
    } else {
      result = res.data.map(item => ({
        name: item.title,
        imgUrl: item.cover,
        rate: item.rate
      }))
    }
    return result
  },
  onPullDownRefresh() {
    console.log('onPulldownrefresh')
    wx.request({
      url: requestType[this.data._type],
      data: {
        start: 0,
        count: 12
      },
      success: res => {
        let movies = this.handleJson(res)
        this.setData({
          movies
        })
        wx.stopPullDownRefresh()
      }
    })
  },
  onReachBottom() {
    wx.showNavigationBarLoading()
    wx.request({
      url: requestType[this.data._type],
      data: {
        start: this.data.movies.length,
        count: 12
      },
      success(res) {
        let movies = this.handleJson(res)
        this.setData({
          movies
        })
        wx.hideNavigationBarLoading()
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    const type = options.type
    this.data._type = type

    wx.request({
      url: requestType[type],
      data: {
        start: 0,
        count: 12
      },
      success: res => {
        // change the json structor to same
        let movies = this.handleJson(res.data);
        this.setData({
          movies
        })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {
    let title = "电影"
    switch (this.data._type) {
      case "in_theaters":
        title = "正在热映"
        break
      case "coming_soon":
        title = "即将上映"
        break
      case "top250":
        title = "豆瓣250"
        break
    }
    wx.setNavigationBarTitle({
      title
    })
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})