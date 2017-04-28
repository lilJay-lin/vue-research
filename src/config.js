/**
 * Created by linxiaojie on 2016/11/21.
 */
let config = {
  RESPONSE_CODE: {
    SUCCESS_CODE: 1,
    DEFAULT_ERROR_CODE: 0,
    DB_VALIDATE_FAIL: -1,
    NO_LOGIN_ERROR: -2,
    UNAUTHORIZED_ERROR: 401,
    NO_PERMISSION: 403,
    SERVER_ERROR: 500
  },
  CACHE: {
    TOKEN_KEY: '__xmb_token__',
    USER_DATA: '__xmb_user_info__'
  },
  DEFAULT_ERROR_MSG: '操作失败，请稍后重试',
  BASE_SERVER_HOST: 'http://localhost:8080'
}
config.BASE_SERVER = config.BASE_SERVER_HOST + '/api'
export default config
