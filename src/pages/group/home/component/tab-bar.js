import React from 'react'
import { Touchable } from 'react-native'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { pxToDp } from '../../../../utils/styles-kits'

export const TabBar = (props) => {
  const { goToPage, tabs, activeTab } = props
  return (
    <ImageBackground
      style={{ height: pxToDp(60), flexDirection: 'row', justifyContent: 'space-evenly' }}
      source={require('../../../../res/rectanglecopy.png')}
    >
      {tabs?.map((item, index) => {
        return <TouchableOpacity
          onPress={() => goToPage(index)}
          style={{
            justifyContent: 'center',
            borderBottomColor: "#fff",
            borderBottomWidth: activeTab === index ? pxToDp(3) : 0
          }}
          key={index}>
          <Text style={{ color: '#fff', fontSize: activeTab === index ? pxToDp(20) : pxToDp(18) }}>{item}</Text>
        </TouchableOpacity>
      })}
    </ImageBackground>
  )
}