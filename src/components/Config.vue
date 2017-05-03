<template>
  <div>
    <div class="navbar navbar-default ">
      <div class="container-fluid">
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="javascript:void(0)" @click="onAddPageHandle">新增页面</a>
          </li>
          <li>
            <a href="javascript:void(0)"  @click="savePage">保存</a>
          </li>
          <li>
            <a :href="'http://localhost:8080/api/h5/preview/' + $route.params.id" target="_blank">预览</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="slider">
      <div class="list-group">
        <a href="javascript:void(0)" class="list-group-item active">
          基础组件
        </a>
        <a href="javascript:void(0)" class="list-group-item" @click="addUnit({type: 'txt'})">
          <span class="glyphicon glyphicon-plus"></span>文字
        </a>
        <a href="javascript:void(0)" class="list-group-item" @click="addUnit({type: 'pic'})">
          <span class="glyphicon glyphicon-plus"></span>图片
        </a>
      </div>
    </div>
    <div class="main-container">
      <div class="list-group page-list">
        <template v-for="(page, index) in pages">
          <a :class="['list-group-item', index === selected ? 'active' : '']" @click="onSelectedPageHandle(index)">
            第{{index + 1}}页
          </a>
        </template>
      </div>
      <Phone :units="units.items"></Phone>
      <Control :unit="currentUnit"></Control>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {NS_UNITS, NS_PAGE} from '../constant/index.js'
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
      vm.loadPage({id: this.$route.params.id}).then(() => {
        vm.onSelectedPageHandle(0)
      })
    },
    computed: {
      ...mapGetters(NS_PAGE, ['pages', 'selected', 'currentPage']),
      ...mapGetters(NS_UNITS, ['units', 'currentUnit'])
    },
    methods: {
      ...mapActions(NS_UNITS, ['addUnit', 'setUnit']),
      ...mapActions(NS_PAGE, ['addPage', 'savePage', 'loadPage', 'selectPage', 'setPage']),
      onSelectedPageHandle: function (id) {
        let vm = this
        if (vm.selected !== id) {
          /*
           * 切换选中页，保存当前配置
           * */
          vm.setPage(vm.units)
        }
        vm.selectPage({id: id}).then(() => {
          vm.setUnit(vm.currentPage)
        })
      },
      onAddPageHandle: function () {
        let vm = this
        /*
         * 切换选中页，保存当前配置
         * */
        vm.setPage(vm.units)
        vm.addPage().then(() => {
          vm.setUnit(vm.currentPage)
        })
      }
    }
  }
</script>
<style>
  .main-container{
    width: 100%;
    display: flex;
    padding: 0 50px 0 170px;
  }
  .navbar{
    z-index: 2;
  }
  .control{
    flex: 1;
    position: relative;
  }
  .slider{
    width: 150px;
    background: #fff;
    bottom:0;
    position: fixed;
    top:0;
    left: 0;
    padding: 55px 5px 0;
  }
  .list-group-item .glyphicon{
    margin-right: 10px;
  }
  .page-list{
    margin: 50px 0 0 60px;
  }

</style>
