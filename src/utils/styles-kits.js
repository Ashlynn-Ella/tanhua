import { Dimensions } from 'react-native'

//设计稿得宽度 / 设计元素的宽度 = 手机屏幕 / 实际元素的宽度

// 实际元素的宽度 = 设计元素的宽度 * 手机屏幕 / 设计稿的宽度

//获取手机屏幕的宽度
export const screenWidth = Dimensions.get('window').width

export const screenHeight = Dimensions.get('window').height

export const pxToDp = (elePx)=> elePx * screenWidth / 375