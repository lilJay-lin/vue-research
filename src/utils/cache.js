/**
 * Created by linxiaojie on 2016/11/21.
 */
const storage = sessionStorage
export default {
  set (key, value) {
    storage.setItem(key, value)
  },
  get (key) {
    return storage.getItem(key)
  },
  remove (key) {
    return storage.removeItem(key)
  }
}
