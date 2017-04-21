<template>
  <div>
    <ul class="app-link">
      <router-link to="/">首页</router-link>
      <router-link to="/animate">动画</router-link>
    </ul>
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
