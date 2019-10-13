<template>
  <div class="home">
    <div class="home-content">
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
    </div>
  </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper';
export default {
    components: { MySwiper },
    data () {
        return {
            swiperImgs: [],
            swiperHeight: '184px'
        };
    },
    created () {
        this.getSwiperImgs();
    },
    methods: {
        getSwiperImgs () {
            this.$http.post('/api/getSwiperImgs').then(data => {
                let { success, swiperImgs } = data;
                if (success) {
                    swiperImgs.forEach(item => {
                        this.swiperImgs.push(
                            'http://www.fanzehua.cn/uploads/images/' + item.icon
                        );
                    });
                }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
.home {
  width: 100%;
  height: 100%;
  &-content {
    height: 100%;
  }
}
</style>
