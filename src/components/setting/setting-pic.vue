<template>
  <setting-container>
    <setting-common :css-text="cssText"></setting-common>
    <div class="form-group">
      <label for="select_pic" class="col-sm-2 control-label">图片地址</label>
      <div class="col-sm-10">
        <input type="url" :value="src" id="select_pic" placeholder="图片地址" @change="setData('src', $event.target.value)" class="form-control"/>
      </div>
    </div>
    <div class="form-group">
      <label for="select_class" class="col-sm-2 control-label">图片外观</label>
      <div class="col-sm-10">
        <select id="select_class" name="图片外观" @change="setData('className', $event.target.value)" class="form-control">
          <option :value="o.key" v-for="o in classNames" :selected="o.key === className ? 'selected' : ''">{{o.value}}</option>
        </select>
      </div>
    </div>
    <div class="form-group">
      <label for="select_upload_pic" class="col-sm-2 control-label">上传图片</label>
      <div class="col-sm-8">
        <input type="file" id="select_upload_pic" class="form-control js-file"/>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-primary control-label" @click="onUploadHandle" data-file=".js-file">上传图片</button>
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
      },
      cssText: {
        type: String,
        default: ''
      }
    }
  }
</script>
