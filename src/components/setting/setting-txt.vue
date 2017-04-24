<template>
  <div>
    <input type="text" :value="text" @input="setData('text', $event.target.value)" class="form-control"/>
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
