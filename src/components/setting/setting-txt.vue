<template>
  <setting-container>
    <setting-common :css-text="cssText"></setting-common>
    <div class="form-group">
      <label for="input_text" class="col-sm-2 control-label">文本内容</label>
      <div class="col-sm-10">
        <input type="text" :value="text" id="input_text" @input="setData('text', $event.target.value)" class="form-control"/>
      </div>
    </div>
  </setting-container>
</template>
<script type="text/ecmascript-6">
  import SettingMixins from '../../mixins/settting.js'
  import SettingCommon from './setting-common.vue'
  import SettingContainer from './setting-container.vue'
  export default {
    components: {
      SettingCommon,
      SettingContainer
    },
    mixins: [SettingMixins],
    props: {
      text: {
        type: String,
        default: '我是文本'
      },
      cssText: {
        type: String,
        default: ''
      }
    }
  }
</script>
