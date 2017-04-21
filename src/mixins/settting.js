/**
 * Created by linxiaojie on 2017/4/21.
 */
import {NS_UNITS} from '../constant/index.js'
import {mapActions} from 'Vuex'

export default {
  methods: {
    ...mapActions(NS_UNITS, ['setUnitData']),
    setData (key, val) {
      let obj = {}
      obj[key] = val
      this.setUnitData(obj)
    }
  }
}
