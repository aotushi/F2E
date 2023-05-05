<template>
  <div class="pagination">
    <!-- 上一页不能点击的时候 -->
    <button :disabled="currentPageNo === 1" @click="$emit('changePageNo', currentPageNo-1)">上一页</button>
    <!-- 这个1要显示.  那么start不能是1, 就一定大于1 -->
    <button v-if="startEnd.start!==1" @click="$emit('changePageNo', 1)">1</button>
    <button v-if="startEnd.start>2">···</button>

    <!-- 这里是用来显示连续页的 -->
    <button :class="{active:currentPageNo === page}" v-for="page in startEnd.end" :key="page" v-if="page>=startEnd.start" @click="$emit('changePageNo', page)">{{page}}</button>
    
    <!-- 这三个点, 也不是永远显示的 -->
    <button v-if="startEnd.end < totalPageNo -1">···</button>
    <button v-if="startEnd.end < totalPageNo" @click="$emit('changePageNo', totalPageNo)">{{totalPageNo}}</button>
    <button :disabled="currentPageNo === totalPageNo" @click="$emit('changePageNo', currentPageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:{
      currentPageNo:Number,
      total:{
        type:Number,
        default:0
      },
      pageSize:{
        type:Number,
        default:0
      },
      continueNo:{
        type:Number,
        required:true
      }
    },
    computed:{
      // 计算总页码
      totalPageNo(){
        return Math.ceil(this.total / this.pageSize)
      },
      // 计算连续页的起始和结束位置  连续页: 连续展示的几个页面
      startEnd(){
        let {continueNo, currentPageNo, totalPageNo} = this;
        let start=0;
        let end=0;

        if(continueNo>=totalPageNo){
          start=1,
          end=totalPageNo
        }else{
          // 正常情况
            start=currentPageNo-Math.floor(continueNo / 2);
            end=currentPageNo + Math.floor(continueNo / 2);

          // 非正常情况
          if(start <= 0){
            // 左侧非正常情况
            start=1
            end=continueNo

          }
          if(end>totalPageNo){
            // 右侧非常正情况
            end=totalPageNo
            start=totalPageNo-continueNo+1;
          }
        }

        return {start, end}
      }
    }
  }
</script>

<style lang="less" scoped>
  .pagination {
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
