<template>
  <div class="home">
    <p class="test">hello world</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'home'
};
</script>

<style lang="scss" scoped>
@import "@css/dimens.scss";
.test {
  font-size: px2rem(16);
}
</style>
