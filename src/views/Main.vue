<template>
  <!-- 在vue这种单页面的应用程序中，它只存在于一个页面 - app.vue，其他的都是组件 -->
  <div class="main">
    <!-- 动态组件 -->
    <component :is="currentComponent"></component>
    <ToolBar @onChangeFragment="onChangeFragment" />
  </div>
</template>

<script>
import ToolBar from '@c/currency/ToolBar';
export default {
    components: {
        ToolBar,
        // 异步组件引入方式，异步组件：只有在需要去展示这个组件的时候，才会把这个组件进行渲染
        home: () => import('@c/Home'),
        my: () => import('@c/My'),
        shopping: () => import('@c/Shopping')
    },
    data () {
        return {
            currentComponent: 'home'
        };
    },
    computed: {},
    methods: {
    // 组件切换
        onChangeFragment (componentName) {
            this.currentComponent = componentName;
        }
    }
};
</script>
<style lang='scss' scoped>
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
