<template>
  <div class="form-horizontal">
    <select name="定位" @change="setStyleProp('position', $event.target.value)">
      <option :value="o.key" v-for="o in positions" :selected="o.key === styleObject.position ? 'selected' : ''">{{o.value}}</option>
    </select>
    <button class="btn btn-primary" @click="upToTop">置顶</button>
    <input type="text" :value="styleObject.top" @input="setStyleProp('top', $event.target.value)">
    <input type="text" :value="styleObject.left" @input="setStyleProp('left', $event.target.value)">
    <input type="url" :value="src" placeholder="图片地址" @change="setData('src', $event.target.value)" class="form-control"/>
    <select name="图片外观" @change="setData('className', $event.target.value)" class="form-control">
      <option :value="o.key" v-for="o in classNames" :selected="o.key === className ? 'selected' : ''">{{o.value}}</option>
    </select>
    <input type="file" class="form-control js-file"/>
    <button class="btn btn-primary control-label" @click="onUploadHandle" data-file=".js-file">上传图片</button>
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
        ],
        classNames: [
          {
            key: '',
            value: '----'
          },
          {
            key: 'img-circle',
            value: '圆角'
          },
          {
            key: 'img-thumbnail',
            value: '图片集'
          }
        ]
      }
    },
    mixins: [SettingMixins],
    props: {
      src: {
        type: String,
        default: ''
      },
      className: {
        type: String,
        default: ''
      },
      cssText: {
        type: String,
        default: ''
      }
    }
  }
</script>
