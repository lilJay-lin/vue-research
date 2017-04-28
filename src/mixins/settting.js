/**
 * Created by linxiaojie on 2017/4/21.
 */
import {NS_UNITS} from '../constant/index.js'
import {mapActions} from 'Vuex'
import {util} from 'liljay-common-utils'
import {convertToObject, convertToPx} from '../helper/convert.js'
import {upload} from '../helper/upload.js'
import config from '../config'

export default {
  computed: {
    styleObject () {
      return convertToObject(this.cssText)
    }
  },
  methods: {
    ...mapActions(NS_UNITS, ['setUnitData', 'setUnitStyle', 'upToTop']),
    setData (key, val) {
      let obj = {}
      obj[key] = val
      this.setUnitData(obj)
    },
    setStyleProp (key, val) {
      let obj = {}
      obj[key] = convertToPx(key, val)
      this.setUnitStyle(obj)
    },
    onUploadHandle (e) {
      let vm = this
      let btn = e.target
      let fileField = btn.dataset.file
      if (!fileField) {
        return
      }
      let els = document.querySelectorAll(fileField)
      let files = []
      util.each(els, (el) => {
        util.each(el.files, (file) => {
          files.push(file)
        })
      })
      upload(files).then(({res: {list}}) => {
        vm.setData('src', config.BASE_SERVER_HOST + list[0].path)
      })
    }
  }
}
