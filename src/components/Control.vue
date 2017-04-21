<template>
  <div class="control">
    <Setting :data="unit"></Setting>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    unit: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>
<style>
  .number{
    width: 40px;
  }
</style>
