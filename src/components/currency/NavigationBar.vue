<template>
  <!-- 能力：
1.默认展示效果 -> 左边后退按钮，中间页面名称，右边空白内容
2.通过插槽配置不同的展示样式 -> 左，中，右三个插槽，父组件通过这三个插槽制定对应位置的布局
  3.可以接收从外部指定的样式（可以在父组件中指定navigationBar的style-->
  <div class="nav-bar z-index-max" :class="{'bottom-line':pageName}">
    <!-- 左 -->
    <div class="left">
      <!-- 默认状态 -->
      <img v-if="isShowBack" src="@img/back.svg" alt />
      <!-- 具名插槽 -->
      <slot name="nav-left"></slot>
    </div>
    <!-- 中 -->
    <div class="center">
      <!-- 默认状态 -->
      <span v-if="pageName" class="page-title">{{pageName}}</span>
      <!-- 具名插槽 -->
      <slot name="nav-center"></slot>
    </div>
    <!-- 右 -->
    <div class="right">
      <!-- 具名插槽 -->
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
    props: {
    // 页面标题
        pageName: {
            type: String,
            default: ''
        },
        // 是否展示后退按钮
        isShowBack: {
            type: Boolean,
            default: true
        }
    },
    components: {},
    data () {
        return {};
    },
    computed: {},
    methods: {}
};
</script>
<style lang='scss' scoped>
@import "@css/style.scss";
.nav-bar {
  width: 100%;
  height: px2rem(44);
  line-height: px2rem(44);
  display: flex;
  justify-content: space-between;
  .left,
  .right {
    display: flex;
    height: 100%;
    width: px2rem(26);
    padding: 0 $marginSize;
    img {
      width: 100%;
      align-self: center;
    }
  }
  .center {
    display: flex;
    flex-grow: 1;
    height: 100%;
    .page-title {
      font-size: $titleSize;
      align-self: center;
      margin: 0 auto;
    }
  }
}
.bottom-line {
  border-bottom: 1px solid $lineColor;
}
</style>
