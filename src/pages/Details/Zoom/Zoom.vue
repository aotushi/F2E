<template>
  <div class="spec-preview">
    <!--  Cannot read property '0' of undefined" 会报这个错，页面又没问题   传过来的是undefined-->
    <!--  Cannot read property imgList of undefined" 会报这个错，页面又没问题  空数组的0项的对象的属性值也是undefined-->
    <!-- <img :src="imgList[0].imgUrl" /> -->
    <!-- 这是中图 -->
    <img :src='defaultImg.imgUrl' />
    <!-- 这是空div, 覆盖中图 承接鼠标事件-->
    <div class="event" @mousemove="move"></div>
    <!-- 这是大图 -->
    <div class="big">
      <img :src="defaultImg.imgUrl" ref="bigImg"/>
    </div>
    <!-- 这是蒙版 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imgList'],
    data(){
      return {
        defaultIndex:0
      }
    },
    computed:{
      // 根据设置的下标计算图片
      defaultImg(){
        return this.imgList[this.defaultIndex] || {};
      }
    },
    mounted(){
      // 兄弟组件使用全局事件总线来传递index
      this.$bus.$on('changeDefaultIndex', this.changeDefaultIndex);
    },
    methods:{
      changeDefaultIndex(index){
        this.defaultIndex=index;
      },
      move(event){
        //  鼠标动,蒙版动. 需要根据鼠标的位置求蒙版的位置
        // event.clientX 相对视口左上角
        // event.pageX   相对页面左上角
        // event.offsetX 相对元素自身左上角
        let bigImg = this.$refs.bigImg;
        let mask = this.$refs.mask;
        // 获取鼠标位置
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;
        // 根据鼠标位置和蒙版宽度计算蒙版位置
        let maskX = mouseX - mask.offsetWidth/2;
        let maskY = mouseY - mask.offsetHeight/2;
        // 设置蒙版位置前,限定边界
        if(maskX < 0){
          maskX = 0;
        }else if(maskX > mask.offsetWidth ){   //样式中的宽度是父元素的一半
          maskX = mask.offsetWidth;
        }
        if(maskY < 0){
          maskY = 0;
        }else if(maskY > mask.offsetHeight){
          maskY = mask.offsetHeight;
        }
        // 设置蒙版的位置
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 蒙版动, 大图动 大图刚好移动蒙版反向2倍
        bigImg.style.left = -maskX*2 + 'px';
        bigImg.style.top = -maskY*2 + 'px';
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }
    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }
    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;
      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }
    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>
