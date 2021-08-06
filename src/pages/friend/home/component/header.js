import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { tanhua, near, testSoul } from '../../../../res/fonts/iconSvg'
import SvgUri from 'react-native-svg-uri'
import { pxToDp } from '../../../../utils/styles-kits'
import { useNavigation } from '@react-navigation/native'

export const FriendHeader = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-around' }}>
      <TouchableOpacity onPress={()=>navigation.navigate('TanHua')} activeOpacity={1} style={{ alignItems: "center" }}>
        <View style={{ ...style.hdIcon, backgroundColor: "red" }}>
          <SvgUri
            width="40"
            height="40"
            svgXmlData={tanhua}
          />
        </View>
        <Text style={style.hdText}>探花</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('Search')} activeOpacity={1} style={{ alignItems: "center" }}>
        <View style={{ ...style.hdIcon, backgroundColor: "#2db3f8" }}>
          <SvgUri
            width="40"
            height="40"
            svgXmlData={near}
          />
        </View>
        <Text style={style.hdText}>搜附近</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('TestSoul')} activeOpacity={1} style={{ alignItems: "center" }}>
        <View style={{ ...style.hdIcon, backgroundColor: "#ecc768" }}>
          <SvgUri
            width="40"
            height="40"
            svgXmlData={testSoul}
          />
        </View>
        <Text style={style.hdText}>测灵魂</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
  hdIcon: {
    width: pxToDp(70), height: pxToDp(70), borderRadius: pxToDp(35),
    justifyContent: "center", alignItems: "center"
  },
  hdText: { fontSize: pxToDp(18), marginTop: pxToDp(4), color: "#ffffff9a" }
})