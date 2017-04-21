<template>
  <img :src="option.src" alt="" :style="option.styleObject">
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      option: {
        type: Object,
        default: function () {
          return {
            src: '',
            styleObject: {}
          }
        }
      }
    }
  }
</script>
