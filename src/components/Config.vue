<template>
  <div>
    <button @click="saveUnit" class="btn btn-primary">保存</button>
    <div class="container">
      <div class="units">
        <button @click="addUnit({type: 'txt'})" class="btn btn-primary">添加文字</button>
        <button @click="addUnit({type: 'pic'})"  class="btn btn-primary">添加图片</button>
      </div>
      <Phone :units="units.items"></Phone>
      <Control :unit="currentUnit"></Control>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {NS_UNITS} from '../constant'
  import {mapGetters, mapActions} from 'Vuex'
  import Control from './Control.vue'
  import Phone from './Phone.vue'
  export default {
    components: {
      Control,
      Phone
    },
    data: function () {
      return {
        screenRect: {}
      }
    },
    created: function () {
      let vm = this
      vm.getUnit({id: this.$route.params.id}).then((data) => {
        vm.setUnit(data)
      })
    },
    computed: mapGetters(NS_UNITS, ['units', 'selected', 'currentUnit']),
    methods: {
      ...mapActions(NS_UNITS, ['addUnit', 'setUnit', 'saveUnit', 'getUnit'])
    }
  }
</script>
<style>
  .container{
    width: 100%;
    display: flex;
  }
  .config{
    position: relative;
    width: 320px;
    height: 480px;
    margin: 0 auto;
    background: #fff;
    border: 1px solid #000000;
    cursor: pointer;
  }
  .units{
    position: relative;
    flex: 1;
  }
  .units .unit:before{
    position: absolute;
    bottom:0;
    right: 25px;
    font-size: 25px;
    content: '+';
    padding: 5px 15px;
    border: 1px solid #e2e2e2;
  }
  .control{
    flex: 1;
    position: relative;
  }
  .unit{
    position: absolute;
    overflow: hidden;
    border: 1px solid #000;
  }
</style>
