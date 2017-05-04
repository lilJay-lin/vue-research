<template>
  <div class="phone" ref="screen" :style="{'background-color': units.background}">
    <template v-for="(unit, index) in units.items">
      <Unit :data="unit" :selected="selected === index" :index="index"></Unit>
    </template>
  </div>
</template>
<script type="text/ecmascript-6">
  import eventBus from '../event-bus/index.js'
  import {mapActions, mapGetters} from 'Vuex'
  import {NS_UNITS} from '../constant'
  export default {
    props: {
      units: {
        type: Object,
        default: function () {
          return {
            background: '',
            backgroundImage: '',
            items: []
          }
        }
      }
    },
    computed: mapGetters(NS_UNITS, ['selected']),
    created: function () {
      let vm = this
      eventBus.$on('mousestart:unit', function (id) {
        vm.selectUnit({id})
      })
      eventBus.$on('mouseup:unit', function (el) {
        if (el) {
          vm.setUnitData({
            cssText: el.style.cssText
          })
        }
      })
    },
    methods: {
      ...mapActions(NS_UNITS, ['selectUnit', 'setUnitData'])
    }
  }
</script>
<style>
  .phone{
    position: relative;
    width: 320px;
    height: 480px;
    margin: 0 30px;
    cursor: pointer;
    border: 1px solid #e2e2e2;
    box-sizing: border-box;
    background: url('/static/assets/img/grid_bg.png') 50% 0 repeat;
    background-size: 100% auto;
    overflow-x:hidden;
    overflow-y: auto;
  }
  .phone::-webkit-scrollbar{
    width: 5px;
    height: 20px;
  }
  .phone::-webkit-scrollbar-thumb{
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  .selected {
    border: 2px solid #0088f6;
  }
</style>
