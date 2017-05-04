<template>
  <div>
    <div class="form-group">
      <label for="select_position" class="col-sm-2 control-label">定位</label>
      <div class="col-sm-3">
        <select name="定位" id="select_position" class="form-control" @change="setStyleProp('position', $event.target.value)">
          <option :value="o.key" v-for="o in positions" :selected="o.key === styleObject.position ? 'selected' : ''">{{o.value}}</option>
        </select>
      </div>
      <div v-show="'relative/absolute'.indexOf(styleObject.position) > -1" class="col-sm-7">
        <label for="input_top" class="col-sm-2 control-label">Top</label>
        <div class="col-sm-3">
          <input type="text" :value="styleObject.top" id="input_top" class="form-control" @input="setStyleProp('top', $event.target.value)">
        </div>
        <label for="input_left" class="col-sm-2 control-label">Left</label>
        <div class="col-sm-3">
          <input type="text" :value="styleObject.left" id="input_left" class="form-control" @input="setStyleProp('left', $event.target.value)">
        </div>
        <div class="col-sm-2"><button class="btn btn-primary" @click="upToTop">置顶</button></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import SettingMixins from '../../mixins/settting.js'
  export default {
    data: function () {
      return {
        positions: [
          {
            key: 'initial',
            value: '默认'
          },
          {
            key: 'relative',
            value: '相对定位'
          },
          {
            key: 'absolute',
            value: '绝对定位'
          }
        ]
      }
    },
    mixins: [SettingMixins],
    props: {
      cssText: {
        type: String,
        default: ''
      }
    }
  }
</script>
