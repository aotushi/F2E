<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList " :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked" @click="updateCartIsCheck(cart.skuId, cart.isChecked)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateSkuNum(cart, -1, true)">-</a>
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="cart.skuNum" @change="updateSkuNum(cart,$event.target.value, false)">
            <a href="javascript:void(0)" class="plus" @click="updateSkuNum(cart, 1, true)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="deleteShopCart(cart)">删除</a>
            <br>
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAll">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{skuAllMount}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{skuAllMoney}}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
  export default {
    name: 'ShopCart',
    mounted(){
      // console.log(this)
      this.getShopCartInfo();
    },
    methods:{
      getShopCartInfo(){
        this.$store.dispatch('getShopCartInfo');
      },
      // 更新商品数量: 判断+更新数据+再次请求数据 正数代表增加,负数代表减少
      async updateSkuNum(cart, disNum, flag){
        let originNum = cart.skuNum;
          if(flag){
              // flag为true, disNum是(1 或 -1)  传递的变化的量  另一种解决方案是当为1时, 减号就disabled
              if(disNum + originNum < 1){
                  disNum = 1 - originNum;
              }
          }else{
              // flag为false, disNum是输入的最终值  传递的是最终的数量
              if(disNum < 1){ //disNum此时代表的是最终的值
                // 如果输入的值小于1, 那么也就是求原值originNum到最终值1的变化.(数字是从大变小的, 所以值是负或0)
                  disNum = 1 - originNum; //这里的disNum代表的是变化的量  因为最终发请求的时候需要的是变化的量
              }else{
                // 如果输入的值不小于1, 那么也就是求原值originNum到输入值|最终值disNum的变化(变化的量=最终值-原值 )
                disNum = disNum - originNum; //等号左边代表变化的量, 等号右边代表输入的数量
              }
          }

          //经历了上面的过程, 到这里disNum一定是变化的量. 无论是点击'+ -' 或 输入
            try {
               // 发请求修改数量
              await  this.$store.dispatch('addOrUpdateShopCart', {skuId:cart.skuId, skuNum:disNum})
              alert('更改成功');
              // 发请求再次更新数量
              this.getShopCartInfo();
            } catch (error) {
              alert(error.message);
            }   
      },
      // 更新商品的复选框
      async updateCartIsCheck(skuId, isChecked){
        try {
          await this.$store.dispatch('updateCartIsCheck', {skuId, isChecked:isChecked?0:1});
          alert('更新成功');
          this.getShopCartInfo();
        } catch (error) {
          alert(error.message);
        }
      },
      // 删除单个购物车数据
      async deleteShopCart(cart){
        try {
          await this.$store.dispatch('deleteShopCart', cart.skuId);
          alert('删除单个商品修改成功');
          this.getShopCartInfo();
        } catch (error) {
          alert(error.message)
        }
      },
      // 删除多个购物车数据
      async deleteAll(){
            try {
            await this.$store.dispatch('deleteAllShopCart');
            alert('删除多个商品成功');
            this.getShopCartInfo();
          } catch (error) {
            alert('失败原因: ['+error.message+']')
          }
      }
    },
    computed:{
      // ...mapState({  @1
      //   shopCartInfo: state => state.shopCart.shopCartInfo || {}
      // }),
      ...mapGetters(['cartInfo']),

      cartInfoList() {
        return this.cartInfo.cartInfoList || []
      },

      // 这里需要解决假报错问题. shopCartInfo没有请求回来时, 会出现TypeError错误
      // cartInfoList(){   @2
      //   return this.shopCartInfo[0].cartInfoList || []
      // },
      // input多选框状态 注意:可读取可设置,需要使用计算属性的完整写法
     isAllChecked:{
          get(){
            return this.cartInfoList.every(item => item.isChecked)
          },
          async set(value){
            // 点击输入框. 获得的是全选/全不选的布尔值  使用的v-model获取
            try {
              await this.$store.dispatch('updateCartIsCheckAll', value?1:0);
              // 以上返回的就是Promise.all返回的新的promise结果数组
              alert('更改成功')
              this.getShopCartInfo();     
            } catch (error) {
              alert(error.message);
            }   
          }
      },
      // 计算商品总数. 
      skuAllMount(){
        return this.cartInfoList.reduce((prev, item)=>{
          if (item.isChecked) {
            prev += item.skuNum
          }
          return prev
        }, 0)
      },
      // 计算商品总价格
      skuAllMoney(){
        return this.cartInfoList.reduce((preVal, cart)=>{
          if (cart.isChecked) {
            preVal += cart.skuPrice*cart.skuNum;
          }
            return preVal
        }, 0)
      },
      
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;
    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }
    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;
        &>div {
          float: left;
        }
        .cart-th1 {
          width: 25%;
          input {
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
        .cart-th2 {
          width: 25%;
        }
        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;
        }
      }
      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;
        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;
          &>li {
            float: left;
          }
          .cart-list-con1 {
            width: 15%;
          }
          .cart-list-con2 {
            width: 35%;
            img {
              width: 82px;
              height: 82px;
              float: left;
            }
            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }
          // .cart-list-con3 {
          //   width: 20.8333%;
          //   .item-txt {
          //     text-align: center;
          //   }
          // }
          .cart-list-con4 {
            width: 10%;
          }
          .cart-list-con5 {
            width: 17%;
            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }
            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }
          .cart-list-con6 {
            width: 10%;
            .sum {
              font-size: 16px;
            }
          }
          .cart-list-con7 {
            width: 13%;
            a {
              color: #666;
            }
          }
        }
      }
    }
    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;
      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;
        span {
          vertical-align: middle;
        }
        input {
          vertical-align: middle;
        }
      }
      .option {
        padding: 10px;
        overflow: hidden;
        float: left;
        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }
      .money-box {
        float: right;
        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }
        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;
          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }
        .sumbtn {
          float: right;
          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
