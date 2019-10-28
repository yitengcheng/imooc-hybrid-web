<template>
  <div class="home">
    <navigation-bar :isShowBack="false">
      <!-- 左侧插槽 -->
      <template slot="nav-left">
        <img src="@img/more-white.svg" alt />
      </template>
      <!-- 中间插槽 -->
      <template slot="nav-center">
        <search :bgColor="'#fff'" :hintColor="'#999'" :icon="require('@img/search.svg')"></search>
      </template>
      <!-- 右侧插槽 -->
      <template slot="nav-right">
        <img src="@img/message-white.svg" alt />
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
      <goods></goods>
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
            secondsDatas: []
        };
    },
    created () {
        this.initData();
    },
    methods: {
    // 获取数据
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
