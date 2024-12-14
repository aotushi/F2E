// components/post/index.js
Component({

  properties: {
    res: Object
  },
  /**
   * Page initial data
   */
  data: {
    res: Object,
  },

  methods: {
    // onGoToDetail(event){
    //   // console.log(this.properties.movie)
    //   const mid=this.properties.movie.doubanId
    //   wx.navigateTo({
    //     url: '/pages/movie-detail/movie-detail?mid='+mid
    //   })
    // },
  },
  
  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

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

  },
  onError(event){
    // 图片加载异常
    this.setData({
      showImage: false
    })
  }
})