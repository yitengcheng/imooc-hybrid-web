<template>
  <div class="home" @scroll="onScrollChange" ref="home">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <!-- 左侧插槽 -->
      <template slot="nav-left">
        <img :src="navBarCurrentSlotStyle.leftIcon" alt />
      </template>
      <!-- 中间插槽 -->
      <template slot="nav-center">
        <search
          :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :hintColor="navBarCurrentSlotStyle.search.hintColor"
          :icon="navBarCurrentSlotStyle.search.icon"
        ></search>
      </template>
      <!-- 右侧插槽 -->
      <template slot="nav-right">
        <img :src="navBarCurrentSlotStyle.rightIcon" alt />
      </template>
    </navigation-bar>
    <div class="home-content">
      <!-- swiper -->
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
      <!-- 520活动 -->
      <activity>
        <div class="activity-520">
          <img v-for="(item,index) in activityDatas" :key="index" :src="item" />
        </div>
      </activity>
      <!-- 功能选项 -->
      <mode-options></mode-options>
      <!-- 秒杀功能 -->
      <seconds :dataSource="secondsDatas"></seconds>
      <!-- 拼购节 -->
      <activity>
        <div class="activity-pin-gou-jie">
          <img src="@img/pinGouJie.gif" />
        </div>
      </activity>
      <!-- 商品列表 -->
      <goods :isScroll="false" :layoutType="'3'"></goods>
    </div>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper';
import Activity from '@c/currency/Activity';
import ModeOptions from '@c/currency/ModeOptions';
import Seconds from '@c/seconds/Seconds';
import Goods from '@c/goods/Goods';
import NavigationBar from '@c/currency/NavigationBar';
import Search from '@c/currency/Search';
export default {
    components: {
        MySwiper,
        Activity,
        ModeOptions,
        Seconds,
        Goods,
        NavigationBar,
        Search
    },
    data () {
        return {
            swiperImgs: [],
            swiperHeight: '184px',
            activityDatas: [],
            secondsDatas: [],
            // navBar 插槽的样式数据，包含页面未开始滑动的时候插槽的样式和页面滑动到锚定点之后插槽的样式
            navBarSlotStyle: {
                // 默认样式
                normal: {
                    // 左侧插槽
                    leftIcon: require('@img/more-white.svg'),
                    // 中间插槽
                    search: {
                        bgColor: '#fff',
                        hintColor: '#999',
                        icon: require('@img/search.svg')
                    },
                    // 右侧插槽
                    rightIcon: require('@img/message-white.svg')
                },
                // 高亮样式
                highlight: {
                    // 左侧插槽
                    leftIcon: require('@img/more.svg'),
                    // 中间插槽
                    search: {
                        bgColor: '#d7d7d7',
                        hintColor: '#fff',
                        icon: require('@img/search-white.svg')
                    },
                    // 右侧插槽
                    rightIcon: require('@img/message.svg')
                }
            },
            // navBar 当前使用的插槽样式
            navBarCurrentSlotStyle: {},
            // navBar 定制样式
            navBarStyle: {
                position: 'fixed',
                backgroundColor: ''
            },
            // 记录页面滚动值
            scrollTopValue: -1,
            // 锚点值
            ANCHOR_SCROLL_TOP: 160
        };
    },
    created () {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
        this.initData();
    },
    /**
   * keepAlive 组件被激活的时候调用
   * 去为滑动模块指定滑动距离
   */
    activated () {
        this.$refs.home.scrollTop = this.scrollTopValue;
    },
    methods: {
    /**
     *  获取数据
     */

        initData () {
            // this.$http.post('/api/getSwiperImgs').then(data => {
            //     let { success, swiperImgs } = data;
            //     if (success) {
            //         swiperImgs.forEach(item => {
            //             this.swiperImgs.push(
            //                 'http://www.fanzehua.cn/uploads/images/' + item.icon
            //             );
            //         });
            //     }
            // });
            // this.$http.post('/api/getActivityImgs').then(data => {
            //     let { success, activityImgs } = data;
            //     if (success) {
            //         activityImgs.forEach(item => {
            //             this.activityDatas.push(
            //                 'http://www.fanzehua.cn/uploads/images/' + item.icon
            //             );
            //         });
            //     }
            // });
            // axios同时发送多个并行请求
            this.$http
                .all([
                    this.$http.post('/api/getSwiperImgs'),
                    this.$http.post('/api/getActivityImgs'),
                    this.$http.post('/api/getSeconds')
                ])
                .then(
                    this.$http.spread((swiperData, activityData, secondsData) => {
                        if (swiperData.success) {
                            swiperData.swiperImgs.forEach(item => {
                                this.swiperImgs.push(
                                    'http://www.fanzehua.cn/uploads/images/' + item.icon
                                );
                            });
                        }
                        if (activityData.success) {
                            activityData.activityImgs.forEach(item => {
                                this.activityDatas.push(
                                    'http://www.fanzehua.cn/uploads/images/' + item.icon
                                );
                            });
                        }
                        if (secondsData.success) {
                            this.secondsDatas = secondsData.list;
                        }
                    })
                );
        },
        /**
     * 监听页面滚动
     * 1. 获取当前页面滚动距离
     * 2. 计算navBar背景颜色(navBar背景透明度)
     *      当前滚动距离/锚点值 = navbar透明度 opacity
     * 3. opacity >=1,当前滚动距离超过锚点值,当前navbar插槽的样式变为高亮状态样式
     *      否则的话 opacity <1,当前navbar插槽的样式为默认插槽样式
     */
        onScrollChange ($event) {
            // 获取当前页面滚动距离
            this.scrollTopValue = $event.target.scrollTop;
            // 计算navBar背景颜色(navBar背景透明度)
            let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
            // 指定navbar插槽样式
            if (opacity >= 1) {
                this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight;
            } else {
                this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
            }
            // 根据透明比例来设置 navbar的背景颜色
            this.navBarStyle.backgroundColor = 'rgba(255,255,255,' + opacity + ')';
        }
    }
};
</script>
<style lang='scss' scoped>
@import "@css/style.scss";
.home {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  overflow: hidden;
  overflow-y: auto;
  &-content {
    height: 100%;
    .activity-520 {
      margin-top: px2rem(-8);
      border-top-left-radius: px2rem(8);
      border-top-right-radius: px2rem(8);
      img {
        display: inline-block;
        width: 33.33%;
      }
    }
    .activity-pin-gou-jie {
      background-color: #fff;
      margin-top: $marginSize;
      img {
        width: 100%;
      }
    }
  }
}
</style>
