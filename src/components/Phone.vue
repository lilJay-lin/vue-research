<template>
  <div class="config" ref="screen">
    <template v-for="unit in units">
      <Unit :data="unit"></Unit>
    </template>
  </div>
</template>
<script type="text/ecmascript-6">
  import eventBus from '../event-bus/index.js'
  import {mapActions} from 'Vuex'
  import {NS_UNITS} from '../constant'
  export default {
    props: {
      units: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    created: function () {
      let vm = this
      eventBus.$on('click:unit', function (id) {
        vm.selectUnit({id})
      })
    },
    methods: {
      ...mapActions(NS_UNITS, ['selectUnit'])
    }
  }
</script>
