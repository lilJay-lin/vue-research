<template>
  <div>
    <setting-common :css-text="cssText"></setting-common>
    <div class="form-group">
      <label for="input_text" class="col-sm-2 control-label">文本内容</label>
      <div class="col-sm-10">
        <input type="text" :value="text" id="input_text" @input="setData('text', $event.target.value)" class="form-control"/>
      </div>
    </div>
    <div class="form-group">
      <label for="select_bg" class="col-sm-2 control-label">背景颜色</label>
      <div class="bg-color" :style="{background: styleObject['background-color']}">
        <input type="color" id="select_bg" @change="setStyleProp('background-color', $event.target.value)">
      </div>
    </div>
    <div class="form-group">
      <label for="select_color" class="col-sm-2 control-label">文字颜色</label>
      <div class="bg-color" :style="{color: styleObject.color}">
        <input type="color"  id="select_color" @change="setStyleProp('color', $event.target.value)">
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import SettingMixins from '../../mixins/settting.js'
  import SettingCommon from './setting-common.vue'
  export default {
    components: {
      SettingCommon
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
