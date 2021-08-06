import React from 'react'
import { View, Text } from 'react-native'
import IconMap from '../../res/fonts/icon'

export const IconFont = (props) => <Text onPress={props.onPress}
style={{ fontFamily: "iconfont", ...props.style }}>{IconMap[props.name]}</Text>