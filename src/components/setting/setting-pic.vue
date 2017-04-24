<template>
  <div class="">
    <input type="url" :value="src" placeholder="图片地址" @change="setData('src', $event.target.value)" class="form-control"/>
    <select name="图片外观" @change="setData('className', $event.target.value)" class="form-control">
      <option :value="o.key" v-for="o in classNames" :selected="o.key === className ? 'selected' : ''">{{o.value}}</option>
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
        default: ''
      },
      className: {
        type: String,
        default: ''
      }
    }
  }
</script>
