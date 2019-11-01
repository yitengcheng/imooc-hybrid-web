<template>
  <div class="goods-list-page">
    <navigation-bar @onLeftClick="onBackClick" :pageName="'商品列表'">
      <template slot="nav-right">
        <img :src="layoutType.icon" @click="onChangeLayoutTypeClick" />
      </template>
    </navigation-bar>
    <div class="goods-list-page-content">
      <goods-options></goods-options>
      <goods :layoutType="layoutType.type"></goods>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar';
import GoodsOptions from '@c/goods/GoodsOptions';
import Goods from '@c/goods/Goods';
export default {
    components: { NavigationBar, GoodsOptions, Goods },
    data () {
        return {
            // goods展示形式数据源
            layoutTypeDatas: [
                {
                    // 垂直列表
                    type: '1',
                    icon: require('@img/list-type.svg')
                },
                {
                    // 网格布局
                    type: '2',
                    icon: require('@img/grid-type.svg')
                },
                {
                    // 瀑布流布局
                    type: '3',
                    icon: require('@img/waterfall-type.svg')
                }
            ],
            // 当前 goods展示形式
            layoutType: {}
        };
    },
    computed: {},
    methods: {
    /**
     * 后退按钮点击事件
     */
        onBackClick () {
            this.$router.back();
        },
        /**
     * 切换goods展示形式
     */
        onChangeLayoutTypeClick () {
            this.layoutType.type === '1'
                ? (this.layoutType = this.layoutTypeDatas[1])
                : this.layoutType.type === '2'
                    ? (this.layoutType = this.layoutTypeDatas[2])
                    : (this.layoutType = this.layoutTypeDatas[0]);
        }
    },
    created () {
        this.layoutType = this.layoutTypeDatas[0];
    }
};
</script>
<style lang='scss' scoped>
@import "@css/style.scss";
.goods-list-page {
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;
  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
