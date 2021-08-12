
import React, { useRef, useState, useReducer } from "react"
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from "react-native"
import { THNav } from "../../../../component/tanhua-nav"
import { pxToDp } from "../../../../utils/styles-kits"
import Geo from "../../../../utils/geo"
import { IconFont } from "../../../../component/icon-font"
import { launchImageLibrary } from 'react-native-image-picker'
import { Toast, ActionSheet } from "teaset-pro"

export const Publish = () => {
  const inputRef = useRef()
  const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }), {
    textContent: "",
    longitude: "",
    latitude: "",
    location: "",
    // imageContent:[]
    imageList: []
  })
  const { textContent, longitude, latitude, location, imageList } = state
  const handleSetInput = () => {
    if (inputRef.current.isFocused()) {
      inputRef.current.blur()
    } else {
      inputRef.current.focus()
    }
  }
  const getGeo = async () => {
    const res = await Geo.getCityByLocation()
    const { province, district, township, streetNumber } = res.regeocode.addressComponent
    dispatch({
      longitude: streetNumber.location.split(',')[0],
      latitude: streetNumber.location.split(',')[1],
      location: province + district + township
    })

  }
  const handleSelectImage = () => {
    const options = {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
    }
    launchImageLibrary(options, (response) => {
      const image = response.assets[0]
      if (imageList.length >= 9) {
        Toast.sad('图片数量不能超过9张')
        return
      }
      dispatch({
        imageList: [...imageList, image]
      })
    })
  }
  const removeImage = (i) => {
    imageList.splice(i, 1)
    const opts = [
      {
        title: "删除", onPress: () => {
          dispatch({
            imageList
          })
          Toast.smile("删除成功")
        }
      }
    ]
    ActionSheet.show(opts, { title: "取消" })
  }
  const toggleEmotion = () => {

  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <THNav title="发动态" rightText="发帖" />
      <TouchableOpacity
        style={{ height: '40%' }}
        onPress={handleSetInput}
      >
        <TextInput
          ref={inputRef}
          maxLength={140}
          placeholder="请填写动态(140字以内)"
          multiline
          value={state.textContent}
          onChangeText={(textContent) => dispatch({ textContent })}
        />
      </TouchableOpacity>
      <View style={{ alignItems: 'flex-end', justifyContent: 'center', height: pxToDp(40) }}>
        <TouchableOpacity
          onPress={getGeo}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconFont name="iconlocation" style={{ color: "#666", fontSize: pxToDp(16) }} />
          <Text style={{ fontSize: pxToDp(12), color: "#aaa", marginLeft: pxToDp(5), marginRight: pxToDp(5) }}>
            {state.location || '您在哪里?'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: pxToDp(5), paddingBottom: pxToDp(5) }}>
        <ScrollView horizontal>
          {imageList?.map((v, i) => <TouchableOpacity
            onPress={() => removeImage(i)}
            key={i}
            style={{ marginLeft: pxToDp(5), marginRight: pxToDp(5) }}
          >
            <Image
              source={{ uri: v.uri }}
              style={{ width: pxToDp(50), height: pxToDp(50) }}
            />
          </TouchableOpacity>)}
        </ScrollView>
      </View>
      <View style={{ height: pxToDp(50), flexDirection: "row", alignItems: "center", backgroundColor: "#eee" }}>
        <TouchableOpacity
          onPress={handleSelectImage}
          style={{ marginLeft: pxToDp(40), marginRight: pxToDp(40) }}
        >
          <IconFont style={{ fontSize: pxToDp(30), color: "#666" }} name="icontupian" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={toggleEmotion}
        >
          <IconFont style={{ fontSize: pxToDp(30) }} name="iconbiaoqing" />
        </TouchableOpacity>
      </View>
    </View>
  )
}