<template>
  <div>
    <input type="url" :value="src" placeholder="图片地址" @change="setData('src', $event.target.value)"/>
    <select name="图片外观" @change="setData('className', $event.target.value)">
      <option :value="o.key" v-for="o in classNames" :seleted="o.key === className">{{o.value}}</option>
    </select>
  </div>
</template>
<script type="text/ecmascript-6">
  import SettingMixins from '../../mixins/settting.js'
  export default {
    data: function () {
      return {
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
        default: '我是文本'
      },
      className: {
        type: String,
        default: ''
      }
    }
  }
</script>
