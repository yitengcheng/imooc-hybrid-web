<template>
  <div class="mode-options">
    <div
      class="mode-options-item"
      v-for="(item,index) in dataSource"
      :key="index"
      @click="onItemClick(item)"
    >
      <img class="mode-options-item-icon" :src="item.icon" />
      <p class="mode-options-item-title">{{item.title}}</p>
    </div>
  </div>
</template>

<script>
import modeOptions from '@config/modeOptions.js';
export default {
    components: {},
    data () {
        return {
            // 数据源
            dataSource: modeOptions
        };
    },
    computed: {},
    methods: {
        onItemClick (item) {
            this.$router.push({
                name: 'goodsList',
                params: {
                    routerType: 'push'
                }
            });
        }
    }
};
</script>
<style lang='scss' scoped>
@import "@css/style.scss";
.mode-options {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding-bottom: px2rem(14);
  &-item {
    width: 20%;
    text-align: center;
    margin-top: px2rem(10);
    &-icon {
      width: px2rem(40);
      height: px2rem(40);
    }
    &-title {
      font-size: $minInfoSize;
      margin-top: px2rem(6);
    }
  }
}
</style>
