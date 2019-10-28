<template>
  <div class="my">
    <navigation-bar pageName="个人中心" :isShowBack="false"></navigation-bar>
  </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar';
export default {
    components: { NavigationBar },
    data () {
        return {};
    },
    computed: {},
    methods: {}
};
</script>
<style lang='scss' scoped>
.my {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
