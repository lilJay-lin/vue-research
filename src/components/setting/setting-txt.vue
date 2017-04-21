<template>
  <div>
    <input type="text" :value="text" @change="setData('text', $event.target.value)"/>
  </div>
</template>
<script type="text/ecmascript-6">
  import SettingMixins from '../../mixins/settting.js'
  export default {
    mixins: [SettingMixins],
    props: {
      text: {
        type: String,
        default: '我是文本'
      }
    }
  }
</script>
