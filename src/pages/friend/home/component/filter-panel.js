import React, { useReducer } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { pxToDp } from '../../../../utils/styles-kits'
import { IconFont } from '../../../../component/icon-font/index'
import SvgUri from 'react-native-svg-uri'
import { male, female } from '../../../../res/fonts/iconSvg'
import Picker from 'react-native-picker'
import { Slider } from 'react-native-elements'
import cityData from '../../../../res/citys.json'
import { THbutton } from '../../../../component/button'

export const FilterPanel = ({ onClose, onSubmitFilter, options }) => {
  // {
  //   page: 1,
  //   pagesize: 100,
  //   gender: "男",
  //   distance: 2,
  //   lastLogin: "",
  //   city: "",
  //   education: ""
  // }
  const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action, }), { ...options });
  const chooeseGender = (gender) => {
    dispatch({
      gender
    })
  }
  const chooseLastLogin = () => {
    Picker.init({
      pickerData: ["15分钟", "1小时", "1天", "不限制"],
      selectedValue: ['15分钟'],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择近期登录时间",
      onPickerConfirm: data => {
        dispatch({
          lastLogin: data[0]
        })
      }
    });
    Picker.show()
  }
  const chooseCity = () => {
    Picker.init({
      pickerData: cityData,
      selectedValue: ["北京", "北京"],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择城市",
      onPickerConfirm: data => {
        dispatch({
          city: data[0]
        })
      }
    });
    Picker.show()
  }
  const chooseEduction = () => {
    Picker.init({
      pickerData: ["博士后", "博士", "硕士", "本科", "大专", "高中", "留学", "其他"],
      selectedValue: ["其他"],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择学历",
      onPickerConfirm: data => {
        dispatch({
          education: data[0]
        })
      }
    });
    Picker.show()
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
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: pxToDp(15) }}>
        <Text style={{ color: "#777", fontSize: pxToDp(18), width: pxToDp(140) }}>近期登录时间：</Text>
        <Text onPress={chooseLastLogin} style={{ color: "#777", fontSize: pxToDp(18) }}>{state.lastLogin || '请选择'}</Text>
      </View>
      <View style={{ marginTop: pxToDp(15) }}>
        <Text style={{ color: "#777", fontSize: pxToDp(18) }}>距离：{state.distance || 0}KM</Text>
        <Slider
          style={{ marginTop: pxToDp(10) }}
          value={state.distance}
          thumbStyle={{ height: pxToDp(20), width: pxToDp(20) }}
          minimumValue={0}
          maximumValue={10}
          step={0.5}
          onValueChange={(distance) => {
            dispatch({
              distance
            })
            // setOptions({ ...options, distance })
          }}
        />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: pxToDp(15) }}>
        <Text style={{ width: pxToDp(80), fontSize: pxToDp(18), color: '#777' }}>居住地：</Text>
        <Text onPress={chooseCity} style={{ color: "#777", fontSize: pxToDp(18) }}>{state.city || '请选择'}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: pxToDp(15) }}>
        <Text style={{ width: pxToDp(80), fontSize: pxToDp(18), color: '#777' }}>学历：</Text>
        <Text onPress={chooseEduction} style={{ color: "#777", fontSize: pxToDp(18) }}>{state.education || '请选择'}</Text>
      </View>

      <THbutton
        onPress={handleSubmitFilter}
        style={{ width: '100%', height: pxToDp(40), marginTop: pxToDp(15) }}>确认</THbutton>
    </View>
  )
}