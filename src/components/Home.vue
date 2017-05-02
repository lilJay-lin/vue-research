<template>
  <div class="h5">
    <div class="modal" ref="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="toggleDialog(false)"><span>&times;</span></button>
            <h4 class="modal-title">新建页面</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="h5-name" >名称</label>
              <input type="text" class="form-control" ref="h5_name" id="h5-name" placeholder="页面名称">
            </div>
            <div class="form-group">
              <label for="h5-description" >描述</label>
              <input type="text" class="form-control" id="h5-description" ref="h5_description" placeholder="描述">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="toggleDialog(false)">取消</button>
            <button type="button" class="btn btn-primary" @click="onCreateHandle">新建</button>
          </div>
        </div>
      </div>
    </div>
    <div class="h5-control">
      <button class="btn btn-primary" @click="toggleDialog(true)">新增</button>
    </div>
    <div class="container-fluid">
      <div class="row">
        <template v-for = 'h5 in allH5.list'>
          <div class="col-sm-2" >
            <div class="h5-item">
              <span>{{h5.name}}</span>
              <span>{{h5.description}}</span>
              <router-link :to="{name: 'Config', params: {id: h5._id}}">预览</router-link>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="pagination-wrapper">
      <template v-if="allH5.pageInfo.totalPage > 0">
        <ul class="pagination">
          <li v-for="num in allH5.pageInfo.totalPage" :class="[num === allH5.pageInfo.curPage ? 'active' : '']">
            <a href="javascript:void(0)" @click="onLoadHandle(num)" style="cursor: pointer">
              {{num}}
            </a>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {NS_PAGE, NS_H5} from '../constant/index.js'
  import {mapActions, mapGetters} from 'Vuex'
  import {util} from 'liljay-common-utils'
  export default {
    computed: mapGetters(NS_H5, ['allH5']),
    created: function () {
      this.onLoadHandle({page: 1})
    },
    methods: {
      ...mapActions(NS_PAGE, ['createPage']),
      ...mapActions(NS_H5, ['loadH5']),
      toggleDialog: function (status) {
        status ? util.show(this.$refs.modal) : util.hide(this.$refs.modal)
      },
      onCreateHandle: function () {
        let vm = this
        vm.createPage({
          name: vm.$refs.h5_name.value,
          description: vm.$refs.h5_description.value
        }).then((id) => {
          util.hide(this.$refs.modal)
          vm.$router.push({name: 'Config', params: {id: id}})
        })
      },
      onLoadHandle: function (page) {
        let vm = this
        if (page === vm.allH5.pageInfo.curPage) {
          return
        }
        return vm.loadH5({page})
      }
    }
  }
</script>
<style>
  .h5{
    width: 980px;
    margin: 0 auto;
  }
  .h5-control{
    padding: 15px 0;
    border-bottom: 1px solid #e2e2e2;
    margin-bottom: 15px;
  }
  .container-fluid{
    overflow: hidden;
  }
  .row{
    text-align: center;
  }
  .h5-item{
    margin: 0 auto;
    width: 120px;
    height: 120px;
    border: 1px solid #e2e2e2;
  }
  .pagination-wrapper{
    text-align: right;
  }
</style>
