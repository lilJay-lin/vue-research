<template>
  <div>
    <button @click="savePage" class="btn btn-primary">保存</button>
    <a :href="'http://localhost:8080/api/h5/preview/' + $route.params.id" target="_blank" class="btn btn-primary">预览</a>
    <div class="units">
      <button @click="addUnit({type: 'txt'})" class="btn btn-primary">添加文字</button>
      <button @click="addUnit({type: 'pic'})"  class="btn btn-primary">添加图片</button>
      <button @click="onAddPageHandle"  class="btn btn-primary">新增页面</button>
    </div>
    <div class="container">
      <div class="pages">
        <template v-for="(page, index) in pages">
          <div :class="['page', index === selected ? 'selected' : '']" @click="onSelectedPageHandle(index)">
            <p>第{{index + 1}}页</p>
          </div>
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
  .pages{
    width: 100px;
    text-align: center;
  }
  .page{
    margin: 0 auto 15px;
    width: 80px;
    height: 80px;
    border: 1px solid #2e2e2e;
    text-align: center;
  }
  .page.selected{
    border: 1px solid #0088f6;
  }
  .container{
    width: 100%;
    display: flex;
  }
  .control{
    flex: 1;
    position: relative;
  }
</style>
