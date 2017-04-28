<template>
  <button class="btn btn-primary" @click="onCreateHandle">新增</button>
</template>
<script type="text/ecmascript-6">
  import {NS_PAGE} from '../constant/index.js'
  import {mapActions} from 'Vuex'
  export default {
    methods: {
      ...mapActions(NS_PAGE, ['createPage']),
      onCreateHandle: function () {
        let vm = this
        vm.createPage().then((id) => {
          vm.$router.push({name: 'Config', params: {id: id}})
        })
      }
    }
  }
</script>
