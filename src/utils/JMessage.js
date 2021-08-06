import JMessage from "jmessage-react-plugin";
import Toast from './Toast'

export default {
  init() {
    JMessage.init({
      'appkey': 'dea245146f8aa468ee93168d',
      'isOpenMessageRoaming': false,
      'isProduction': false,
      'channel': ''
    })
  },
  register(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.register({
        username,
        password
      }, resolve, reject)
    })
  },
  login(username, password) {
    return new Promise((resolve, reject) => {
      JMessage.login({
        username,
        password
      }, resolve, reject)
    })
  },
  sendTextMessage(username, text, extras = {}) {
    return new Promise((resolve, reject) => {
      const type = 'single'
      JMessage.sendTextMessage({ type, username, text, extras }, resolve, reject)
    })
  },
  getHistoryMessages(username, from, limit) {
    return new Promise((resolve, reject) => {
      JMessage.getHistoryMessages({
        type: 'single', username, from, limit
      }, resolve, reject)
    })
  },
  sendImageMessage(username,path, extras={}) {
    return new Promise((resolve, reject) => {
      JMessage.sendImageMessage({
        type: 'single', username,path, extras
      },resolve,reject)
    })
  }
}