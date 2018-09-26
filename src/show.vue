<template>
  <div>
    <h2>{{ title }}</h2>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>

<style lang="less" scoped>
h2 {
  font-size: 14px;
  color: rgba(69, 90, 100, 0.6);
  font-weight: 400;
  text-align: left;
}
</style>

