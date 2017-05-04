<template>
  <div>
    <div class="navbar navbar-default ">
      <div class="container-fluid">
        <ul class="nav navbar-nav">
          <li>
            <router-link :to="{name: 'Home'}">首页</router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a href="javascript:void(0)"  @click="onSavePage">保存</a>
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
          全局操作
        </a>
        <a href="javascript:void(0)" class="list-group-item" @click="onAddPageHandle">
          <span class="glyphicon glyphicon-plus"></span>添加页面
        </a>
      </div>

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
         <div class="list-group-item-wrapper">
           <a :class="['list-group-item', index === selected ? 'active' : '']" @click="onSelectedPageHandle(index)">
             第{{index + 1}}页
           </a>
           <span class="glyphicon glyphicon-remove" @click="onDelPageHandle(index)" title="删除"></span>
         </div>
        </template>
      </div>
      <Phone :units="units"></Phone>
      <Control :unit="currentUnit" :page = 'units'></Control>
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
      ...mapActions(NS_UNITS, ['addUnit', 'resetUnit']),
      ...mapActions(NS_PAGE, ['addPage', 'delPage', 'savePage', 'loadPage', 'selectPage', 'setPage']),
      onSelectedPageHandle: function (id) {
        let vm = this
        if (vm.selected !== id) {
          /*
           * 切换选中页，保存当前配置
           * */
          vm.setPage(vm.units)
        }
        vm.selectedPage(id)
      },
      selectedPage: function (id) {
        let vm = this
        vm.selectPage({id: id}).then(() => {
          vm.resetUnit(vm.currentPage)
        })
      },
      onAddPageHandle: function () {
        let vm = this
        /*
         * 切换选中页，保存当前配置
         * */
        vm.setPage(vm.units)
        vm.addPage().then((newIndex) => {
          vm.selectedPage(newIndex)
        })
      },
      onDelPageHandle: function (id) {
        let vm = this
        vm.delPage({id: id}).then((len) => {
          /*
          * 页面空，新建空页面
          * */
          if (len === 0) {
            vm.addPage()
          }
          /*
          * 默认选中第一页
          * */
          vm.selectedPage(0)
        })
      },
      onSavePage () {
        this.savePage().then(({message}) => {
          alert(message)
        })
      }
    }
  }
</script>
<style>
  .main-container{
    width: 100%;
    display: flex;
    padding: 0 50px 0 200px;
  }
  .navbar{
    z-index: 2;
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
  .slider .glyphicon{
    margin-right: 10px;
  }
  .list-group-item-wrapper{
    position: relative;
  }
  .list-group-item-wrapper .glyphicon{
    position: absolute;
    left: -20px;
    top: 13px;
    cursor: pointer;
  }
  .list-group-item-wrapper
  .page-list{
    margin: 50px 0 0 60px;
  }

</style>
