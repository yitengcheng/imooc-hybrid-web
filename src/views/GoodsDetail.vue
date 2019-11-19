<template>
  <div class="goods-detail">
    <navgation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click="onBackClick">
          <img :style="{opacity:leftIconStyle}" :src="require('@img/back-2.svg')" alt />
          <img :style="{opacity:navBarSlotOpacity}" :src="require('@img/back-white.svg')" alt />
        </div>
      </template>
      <template v-slot:nav-center>
        <p class="goods-detail-nav-center" :style="{opacity:navBarSlotOpacity}">商品详情</p>
      </template>
    </navgation-bar>
    <div class="goods-detail-content">
      <parallax @onScrollChange="onScrollChange">
        <!-- 缓慢移动区 -->
        <template v-slot:parallax-slow>
          <my-swiper
            :height="SWIPER_IMAGE_HEIGHT + 'px'"
            :swiperImgs="goodData.swiperImgs"
            :paginationType="'2'"
          ></my-swiper>
        </template>
        <!-- 正常移动区 -->
        <template>
          <div class="goods-detail-content-desc">
            <div class="goods-detail-content-desc-item">
              <!-- 商品价格 -->
              <p class="goods-detail-content-desc-item-price">￥{{goodData.price | priceValue}}</p>
              <!-- 商品名称 -->
              <p class="goods-detail-content-desc-item-name">
                <!-- 直营 -->
                <direct v-if="goodData.isDirect"></direct>
                {{goodData.name}}
              </p>
            </div>

            <div class="goods-detail-content-desc-item">
              <!-- 已选商品 -->
              <p class="goods-detail-content-desc-item-select">
                已选
                <span class="single-row-text">{{goodData.name}}</span>
              </p>
              <!-- 附加服务 -->
              <div class="goods-detail-content-desc-item-support">
                <ul class="goods-detail-content-desc-item-support-list">
                  <li
                    class="goods-detail-content-desc-item-support-list-item"
                    v-for="(item, index) in attachDatas"
                    :key="index"
                  >
                    <img src="@img/support.svg" alt srcset />
                    <span>{{item}}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- 商品描述 -->
            <div class="goods-detail-content-desc-detail">
              <img v-for="(item, index) in goodData.detailImags" :key="index" :src="item" alt />
            </div>
          </div>
        </template>
      </parallax>
    </div>
    <div class="goods-detail-buy">
      <div class="goods-detail-buy-add">加入购物车</div>
      <div class="goods-detail-buy-now">立即购买</div>
    </div>
  </div>
</template>

<script>
import NavgationBar from '@c/currency/NavigationBar';
import MySwiper from '@c/swiper/MySwiper';
import Direct from '@c/goods/Direct';
import Parallax from '@c/parallax/Parallax';
export default {
    components: { NavgationBar, MySwiper, Direct, Parallax },
    data () {
        return {
            SWIPER_IMAGE_HEIGHT: 364,
            goodData: {},
            // 记录页面滚动值
            scrollTopValue: -1,
            // 锚点值
            ANCHOR_SCROLL_TOP: 310,
            opacity: 0,
            attachDatas: [
                '可配送海外',
                '京东发货&售后',
                '京准达',
                '211限时达',
                '可自提',
                '不可使用优惠券'
            ]
        };
    },
    computed: {
        leftIconStyle () {
            return 1 - this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
        },
        navBarStyle () {
            return {
                backgroundColor: 'rgba(216,30,6,' + this.navBarSlotOpacity + ')',
                position: 'fixed',
                top: 0
            };
        },
        navBarSlotOpacity () {
            return 1 - this.leftIconStyle;
        }
    },
    methods: {
        onBackClick () {
            this.$router.back();
        },
        onScrollChange ($event) {
            // 获取当前页面滚动距离
            this.scrollTopValue = $event.target.scrollTop;
        }
    },
    created () {
        this.goodData = this.$route.params.good;
    }
};
</script>
<style lang='scss' scoped>
@import "@css/style.scss";
.goods-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  &-nav-left {
    width: 100%;
    display: flex;
    position: relative;
    img {
      align-self: center;
      position: absolute;
    }
  }
  &-nav-center {
    width: 100%;
    color: #fff;
    font-size: $titleSize;
    text-align: center;
  }
  &-content {
    height: 100%;
    &-desc {
      width: 100%;
      background-color: $bgColor;
      box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, 0.2);

      &-item {
        background-color: white;
        padding: $marginSize;
        margin-bottom: $marginSize;
        // 价格
        &-price {
          font-size: px2rem(20);
          color: $mainColor;
          font-weight: 500;
        }
        // 名称
        &-name {
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);
        }
        // 已选商品
        &-select {
          font-size: $infoSize;
          color: $hintColor;
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;

          span {
            color: $textColor;
            font-size: $titleSize;
            font-weight: bold;
            margin-left: px2rem(4);
          }
        }
        // 附加服务
        &-support {
          margin-top: $marginSize;

          &-list {
            display: flex;
            flex-wrap: wrap;

            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: $marginSize;

              img {
                width: px2rem(12);
                margin-right: px2rem(4);
              }

              span {
                font-size: $minInfoSize;
                color: $hintColor;
              }
            }
          }
        }
      }

      // 描述
      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }
  &-buy {
    background-color: #fff;
    border-top: px2rem(1) solid $lineColor;
    height: px2rem(46);
    line-height: px2rem(46);
    text-align: right;
    div {
      display: inline-block;
      width: px2rem(100);
      text-align: center;
      font-size: $infoSize;
      color: #fff;
    }
    &-add {
      background-color: $mainColor;
    }
    &-now {
      background-color: darkgoldenrod;
    }
  }
}
</style>
