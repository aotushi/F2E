## 电影小程序概述

### 目的

由于vue和小程序开发结构类似,可以快速上手.故通过demo项目来快速回顾和熟悉小程序开发,包括不限于组件配置,api,组件,标签,请求,组件封装,信息传递与获取及用户信息,云开发相关.



### 项目效果

以下图片展示了小程序运行之后的首页/搜索页/详情页及评论页面

![home page](C:\PersonalData\gitlab\imgs\home page.png)



![search page](C:\PersonalData\gitlab\imgs\search page.png)![detail](C:\PersonalData\gitlab\imgs\detail.png)![commens](C:\PersonalData\gitlab\imgs\commens.png)





## 电影小程序开发

### api

由于原始api使用,所以从网站找的二次开发的豆瓣api,暂时可用



### 页面介绍

共4个页面,分别是电影首页/电影列表页面/电影详情页面/评论列表页面.

```json
  "pages": [
    "pages/movies/movies", //首页
    "pages/posts/posts",   //评论页
    "pages/post-detail/post-detail", //无
    "pages/more-movie/more-movie",   //更多
    "pages/movie-detail/movie-detail", //电影详情
    "components/movie/index",          //公共组件 单个电影信息
    "components/movie-list/index",     //公共组件 电影列表
    "components/post/index"            //公共组件 评论列表页
  ],
```



### 公共组件

```json
// app.json  
"usingComponents": {
    "movie": "/components/movie/index",
    "l-search-bar": "/miniprogram_npm/lin-ui/search-bar/index",
    "l-rate":"miniprogram_npm/lin-ui/rate/index",
    "l-message": "miniprogram_npm/lin-ui/message/index"
  }
```





### 公共组件-单个电影信息页

路径: `miniprogram/components/movie`

概况: 使用flex布局实现电影海报-名称-评分的纵向布局排列. 使用 `properties`属性配置接收传递进来的电影详情,获取豆瓣电影id, 当点击海报时,跳转到详情页面.

```js
methods: {
  onGoToDetail(event){
    // console.log(this.properties.movie)
    const mid=this.properties.movie.doubanId
    wx.navigateTo({
      url: '/pages/movie-detail/movie-detail?mid='+mid
    })
  },
},
```



### 公共组件-电影列表页

路径: `miniprogram/components/movie-list`

概况: 有了单个电影信息后,就可以组成电影列表. 电影列表页由两部分组件, 一部分是上面的文字介绍,另一部分是海报列表页.两部分均采用flex布局方式.

通过传递进来的'movies'数组进行数据遍历,展示信息.

```wxml
<view class="container f-class">
  <view class="title-container">
    <text>{{title}}</text>
    <text class="more-text">更多</text>
  </view>
  <view class="movie-container">
    <block wx:for="{{movies}}" wx:key="index">
      <movie movie="{{item}}"/>
    </block>
  </view>
</view>
```



### 首页

路径: `miniprogram/pages/movies`

概况: 使用公共组件movie-list+搜索框来实现首页内容的展示.

```wxml
<!--pages/movies/movies.wxml-->

<!-- 搜索框 -->
<l-search-bar bind:lincancel="onSearchCancel" bind:linconfirm="onConfirm" l-class="ex-search-bar" placeholder="星球大战"/>
<!-- 电影推荐版块 -->
<view wx:if="{{!searchResult}}">
  <movie-list
    data-type="in_theaters"
    bind:tap="onGotoMore"
    movies="{{inTheaters}}"
    title="正在热映"
    f-class="movie-list"
  />
  <movie-list
    data-type="coming_soon"
    bind:tap="onGotoMore"
    movies="{{comingSoon}}"
    title="即将上映"
    f-class="movie-list"
  />
  <movie-list
    data-type="top250"
    bind:tap="onGotoMore"
    movies="{{top250}}"
    title="豆瓣Top250"
    f-class="movie-list"
  />
</view>
<!-- 搜索结果列表 -->
<view class="search-container" wx:elif="{{searchData}}">
  <block wx:for="{{searchData}}" wx:key="index">
    <movie class="movie" movie="{{item}}" />
  </block>
</view>
<l-message/>
```



**数据获取**

页面加载时发送数据请求.(需要处理为统一格式)\

使用`wx.request({})`来进行数据获取

```js
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
```





### 更多

路径: `miniprogram/pages/more-movie`

概况: 首页点击链接文字'更多'进入更多页面.页面结构节点,数据展示.使用公共组件movie来进行电影展示.

对不同分类的请求进行处理

```js
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
```



### 详情页

路径: `miniprogram/pages/movie-detail`

概况: 展示单部电影详情

```html
<!--pages/movie-detail/movie-detail.wxml-->
<view class="container">
  <image mode="aspectFill" class="head-img" src="{{movie.image}}">
  </image>
  <view class="head-img-hover">
    <text class="main-title">{{movie.title}}</text>
    <text class="sub-title">{{movie.subtitle}}</text>
    <view class="like">
      <text class="highlight-font">{{movie.wishCount}}</text>
      <text class="plain-font">人喜欢</text>
      <text class="highlight-font">{{movie.commentsCount}}</text>
      <text class="plain-font">条评论</text>
    </view>
    <image bind:tap="onViewPost" class="movie-img" src="{{movie.image}}">
    </image>
  </view>
  <view class="summary">
    <view class="original-title">
      <text>{{movie.title}}</text>
    </view>
    <view class="flex-row">
      <text class="mark">评分</text>
      <view class="score-container">
        <l-rate disabled="{{true}}" size="22" score="{{movie.rating}}" />
        <text class="average">{{movie.average}}</text>
      </view>
    </view>
    <view class="flex-row">
      <text class="mark">导演</text>
      <text>{{movie.directors}}</text>
    </view>
    <view class="flex-row">
      <text class="mark">影人</text>
      <text>{{movie.casts}}</text>
    </view>
    <view class="flex-row">
      <text class="mark">类型</text>
      <text>{{movie.genres}}</text>
    </view>
  </view>
  <view class="hr"></view>
  <view class="synopsis">
    <text class="synopsis-font">剧情简介</text>
    <text class="summary-content">{{movie.summary}}</text>
  </view>
  <view class="hr"></view>
  <view class="casts">
    <text class="cast-font"> 影人</text>
    <scroll-view enable-flex scroll-x class="casts-container">
      <block wx:for="{{movie.castsInfo}}" wx:key="index">
        <view class="cast-container">
          <image class="cast-img" src="{{item.img}}"></image>
          <text>{{item.name}}</text>
        </view>
      </block>
    </scroll-view>
  </view>
</view>
```



### ui框架

使用lin-ui

```json
  "dependencies": {
    "lin-ui": "^0.9.13"
  }
```











