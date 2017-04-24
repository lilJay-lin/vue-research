/**
 * Created by linxiaojie on 2016/7/19.
 */
import Config from '../config'
import Cache from '../utils/cache'
let qwest = require('qwest')

/*
 * 默认配置
 * */
qwest.base = Config.BASE_SERVER
qwest.setDefaultOptions({
  dataType: 'json',
  responseType: 'json'
})

const errorCb = ({reject, res}) => {
  let message = res && res.message || Config.DEFAULT_ERROR_MSG
  reject({message, status: res && res.status || Config.RESPONSE_CODE.SERVER_ERROR, res: null, err: null})
}
export default {
  setOptions ({baseUrl}) {
    if (baseUrl) {
      qwest.base = baseUrl
    }
  },
  request ({
    url,
    method = 'get',
    data = null,
    options = {},
    before = function () {
    }
    }) {
    const headers = options.headers || (options.headers = {})
    headers['x-access-token'] = Cache.get(Config.CACHE.TOKEN_KEY) || null
    let promise = new Promise((resolve, reject) => {
      qwest[method](url, data, options, before).then((xhr, res) => {
        try {
          if (res.status === Config.RESPONSE_CODE.SUCCESS_CODE) {
            resolve(res)
          } else if (res.status === Config.RESPONSE_CODE.UNAUTHORIZED_ERROR) {
            Cache.remove(Config.CACHE.TOKEN_KEY)
            Cache.remove(Config.CACHE.USER_DATA)
            window.location.href = '/login'
          } else {
            reject(res)
          }
        } catch (e) {
          errorCb({reject, res})
        }
      }).catch((e, xml, res) => {
        errorCb({reject, res})
      })
    })
    return promise
  }
}

