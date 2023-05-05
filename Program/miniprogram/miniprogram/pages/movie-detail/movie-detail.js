// pages/movie-detail/movie-detail.js

import {convertToCastString, convertToCastInfos} from '../../utils/utils.js'
const app=getApp()
Page({
  /**
    * 页面的初始数据
    */
  data: {
    movie:{}
  },
  /**
    * 生命周期函数——监听页面加载
    */
  onLoad: function(options){
    const mid=options.mid
    wx.request({
      url: `https://api.wmdb.tv/movie/api?id=`+mid,
      success:(res)=>{
        this.processMovieData(res.data)
      }
    })
  },
  processMovieData(movie){
    const data={}
    data.directors=convertToCastString(movie.director)
    data.casts=convertToCastString(movie.actor)
    data.image = movie.data[0].poster // data.image=movie.images.large
    data.title = movie.originalName // data.title=movie.title
    data.subtitle = movie.data[1].country+'·'+movie.year // data.subtitle=movie.countries[0]+'·'+movie.year
    data.wishCount =  movie.doubanVotes // data.wishCount=movie.wish_count
    data.commentsCount = movie.doubanVotes // data.commentsCount=movie.comments_count
    data.rating = movie.doubanRating // data.rating=movie.rating.stars/10
    data.average = movie.doubanRating // data.average=movie.rating.average
    data.genres = movie.data[1].genre // data.genres=movie.genres.join('、')
    data.summary = movie.data[1].description // data.summary=movie.summary
    data.castsInfo = convertToCastInfos(movie.actor) // data.castsInfo=convertToCastInfos(movie.actor)
    console.log('detail>data',data)
    this.setData({
      movie:data
    })
  },
  onViewPost(event){
    wx.previewImage({
      urls: [this.data.movie.images.large],
    })
  },
  /**
    * 生命周期函数——监听页面初次渲染完成
    */
  onReady: function(){},
  /**
    * 生命周期函数——监听页面显示
    */
  onShow: function(){},
  /**
    * 生命周期函数——监听页面隐藏
    */
  onHide: function(){},
  /**
    * 生命周期函数——监听页面卸载
    */
  onUnload: function(){},
  /**
    * 页面相关事件处理函数——监听用户下拉动作
    */
  onPullDownRefresh: function(){},
  /**
    * 页面上拉触底事件的处理函数
    */
  onReachBottom: function(){},
  /**
    * 用户点击右上角分享
    */
  onShareAppMessage: function(){}
})