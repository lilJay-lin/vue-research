/**
 * Created by linxiaojie on 2017/4/27.
 */
import Server from '../server/index.js'
import {util} from 'liljay-common-utils'
const base = '/image'
export const upload = (files) => {
  let formData = new FormData()
  util.each(files, (file) => {
    formData.append('files', file)
  })
  return Server.request({
    url: base + '/upload',
    method: 'post',
    data: formData
  })
}
