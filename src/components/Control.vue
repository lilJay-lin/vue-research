<template>
  <div class="form-horizontal control">
    <div class="form-group">
      <label for="select_bg" class="col-sm-2 control-label">页面背景色</label>
      <div class="bg-color" :style="{background: page.background  }">
        <input type="color" id="select_bg" @change="setUnitProp({background: $event.target.value})">
      </div>
    </div>
    <Setting :data="unit"></Setting>
  </div>
</template>
<script type="text/ecmascript-6">
import {NS_UNITS} from '../constant/index.js'
import {mapActions} from 'Vuex'
export default {
  props: {
    page: {
      type: Object,
      default: function () {
        return {}
      }
    },
    unit: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    ...mapActions(NS_UNITS, ['setUnitProp'])
  }
}
</script>
<style>
  .control{
    position: relative;
    width: 600px;
  }
  .bg-color{
    position: relative;
    display: inline-block;
    margin-top: 7px;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 10px;
    width: 24px;
    height: 24px;
    overflow: hidden;
    border: 1px solid #000000;
  }
  .bg-color input {
    width: 100%;
    border: 0;
    padding:0;
    margin: 0;
    outline: 0;
    opacity: 0;
  }
</style>
