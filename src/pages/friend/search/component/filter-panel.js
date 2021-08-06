import React, { useReducer } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { pxToDp } from '../../../../utils/styles-kits'
import { IconFont } from '../../../../component/icon-font/index'
import SvgUri from 'react-native-svg-uri'
import { male, female } from '../../../../res/fonts/iconSvg'
import { Slider } from 'react-native-elements'
import { THbutton } from '../../../../component/button'

export const FilterPanel = ({ onClose, onSubmitFilter, options }) => {
  const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action, }), { ...options });
  const chooeseGender = (gender) => {
    dispatch({
      gender
    })
  }
  const handleSubmitFilter = () => {
    console.log(state)
    onSubmitFilter(state)
    onClose()
  }
  return (
    <View style={{
      position: 'absolute', width: '100%', height: '70%',
      left: 0, bottom: 0, backgroundColor: '#fff', paddingLeft: pxToDp(10), paddingRight: pxToDp(10)
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: pxToDp(15) }}>
        <Text></Text>
        <Text style={{ color: "#999", fontSize: pxToDp(26), fontWeight: "bold" }}>筛选</Text>
        <IconFont onPress={onClose} name="iconshibai" style={{ color: '#666', fontSize: pxToDp(30) }} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: pxToDp(15) }}>
        <Text style={{ width: pxToDp(80), fontSize: pxToDp(18), color: '#777' }}>性别：</Text>
        <View style={{ flexDirection: 'row', width: '50%', justifyContent: 'space-around', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => chooeseGender('男')}
            style={{
              width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
              backgroundColor: state.gender === '男' ? 'red' : '#eee',
              justifyContent: 'center', alignItems: 'center'
            }}
          >
            <SvgUri svgXmlData={male} width='36' height='36' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => chooeseGender('女')}
            style={{
              width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
              backgroundColor: state.gender === '女' ? 'red' : '#eee',
              justifyContent: 'center', alignItems: 'center'
            }}
          >
            <SvgUri svgXmlData={female} width='36' height='36' />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: pxToDp(15) }}>
        <Text style={{ color: "#777", fontSize: pxToDp(18) }}>距离：{state.distance/1000 || 0}KM</Text>
        <Slider
          style={{ marginTop: pxToDp(10) }}
          value={state.distance}
          thumbStyle={{ height: pxToDp(20), width: pxToDp(20) }}
          minimumValue={0}
          maximumValue={10}
          step={0.5}
          onValueChange={(distance) => {
            dispatch({
              distance:distance*1000
            })
          }}
        />
      </View>
      <THbutton
        onPress={handleSubmitFilter}
        style={{ width: '100%', height: pxToDp(40), marginTop: pxToDp(15) }}>确认</THbutton>
    </View>
  )
}