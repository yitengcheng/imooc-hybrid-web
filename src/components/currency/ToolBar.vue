<template>
  <div class="tool-bar">
    <!-- tab 按钮 ,需要有一个数据源，通过这个数据源来驱动视图-->
    <div
      class="tool-bar-item"
      @click="onChangeFragment(item,index)"
      v-for="(item,index) in toolBarData"
      :key="index"
    >
      <!-- 当当前 img 标签的index===选中tab的index的时候，就让img显示高亮图片 -->
      <img
        class="tool-bar-item-img"
        :src="selectItemIndex === index ? item.hIcon:item.nIcon"
        alt
        srcset
      />
      <!-- 当当前 p 标签的index===选中tab的index的时候，就让p添加高亮状态的类 -->
      <p
        class="tool-bar-item-name"
        :class="{'tool-bar-item-name-h':selectItemIndex===index}"
      >{{item.name}}</p>
    </div>
  </div>
</template>

<script>
/**
 * ToolBar 的功能
 * 1、永远位于页面的最底部
 * 2、点击 toolbar按钮的时候，页面发生对应的切换
 * 3、按钮分为默认和选中两个状态
 *
 * ----------------------
 * 能力和约束
 * 1、 不具备的能力（约束）
 * 2、 通过一个回调，告诉父组件，按钮的点击事件
 * 3、 当按钮被选中的时候，应该切换按钮的状态
 */
import toolBarMenu from '@config/toolBar';
export default {
    components: {},
    data () {
        return {
            toolBarData: toolBarMenu,
            // 选中状态的按钮
            selectItemIndex: 0
        };
    },
    computed: {},
    methods: {
        onChangeFragment (item, index) {
            this.selectItemIndex = index;
            this.$emit('onChangeFragment', item.componentName);
        }
    }
};
</script>
<style lang='scss' scoped>
@import "@css/style.scss";
.tool-bar {
  width: 100%;
  height: px2rem(46);
  display: flex;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
  border-top: 1px solid $lineColor;
  &-item {
    text-align: center;
    padding: px2rem(4) px2rem(12);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }
    &-name {
      font-size: $infoSize;
      margin-top: px2rem(4);
      &-h {
        color: $mainColor;
      }
    }
  }
}
</style>
