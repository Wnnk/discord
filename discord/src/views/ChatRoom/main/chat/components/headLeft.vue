<script setup lang='ts'>
const props = defineProps<{
  title?:string,
}>()
</script>

<template>
  <div class="header-left-left">
    <h1>{{props.title}}</h1>
  </div>
</template>

<style lang='scss' scoped>
.header-left-left{
  display: flex;
  height: 50px;
  align-items: center;
  width: 140px;

}
</style>