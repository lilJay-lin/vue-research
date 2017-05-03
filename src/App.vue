<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  .app-link{
    display: block;
    list-style: none;
    display: block;
  }
  .app-link li {
    float: left;
    margin-right: 20px;
  }
</style>
