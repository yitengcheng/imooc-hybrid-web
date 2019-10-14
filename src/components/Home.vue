<template>
  <div class="home">
    <div class="home-content">
      <!-- swiper -->
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
      <!-- 520活动 -->
      <activity>
        <div class="activity-520">
          <img v-for="(item,index) in activityDatas" :key="index" :src="item" />
        </div>
      </activity>
    </div>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper';
import Activity from '@c/currency/Activity';
export default {
    components: { MySwiper, Activity },
    data () {
        return {
            swiperImgs: [],
            swiperHeight: '184px',
            activityDatas: []
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
                    this.$http.post('/api/getActivityImgs')
                ])
                .then(
                    this.$http.spread((swiperData, activityData) => {
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
  }
}
</style>
