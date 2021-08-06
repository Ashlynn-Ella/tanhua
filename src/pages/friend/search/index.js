import React, { useEffect, useReducer, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, Image, ImageBackground } from 'react-native'
import { useClinet } from '../../../utils/client'
import { BASE_URI, FRIENDS_SEARCH } from '../../../utils/path-map'
import { pxToDp, screenWidth, screenHeight } from '../../../utils/styles-kits'
import { IconFont } from '../../../component/icon-font'
import { FilterPanel } from './component/filter-panel'
import { Overlay } from 'teaset-pro'

export const Search = () => {
  const [list, setList] = useState([])
  const [state, dispatch] = useReducer((state, action) => ({ ...state, ...dispatch }),
    { gender: '男', distance: 10000 })
  const { get } = useClinet()
  useEffect(async () => {
    getSearch(state)
  }, [])
  //获取数据
  const getSearch = async (state) => {
    const res = await get(FRIENDS_SEARCH, state)
    setList(res.data)
  }
  const WHMap = {
    "wh1": { width: pxToDp(70), height: pxToDp(100) },
    "wh2": { width: pxToDp(60), height: pxToDp(90) },
    "wh3": { width: pxToDp(50), height: pxToDp(80) },
    "wh4": { width: pxToDp(40), height: pxToDp(70) },
    "wh5": { width: pxToDp(30), height: pxToDp(60) },
    "wh6": { width: pxToDp(20), height: pxToDp(50) }
  }
  const getWidthHeight = (dist) => {
    if (dist < 200) {
      return "wh1";
    }
    if (dist < 400) {
      return "wh2";
    }
    if (dist < 600) {
      return "wh3";
    }
    if (dist < 1000) {
      return "wh4";
    }
    if (dist < 1500) {
      return "wh5";
    }
    return "wh6";
  }
  // 点击筛选
  const filterShow = () => {
    let overlayViewRef = null;
    let overlayView = (
      <Overlay.View
        modal={true}
        overlayOpacity={0.4}
        ref={v => overlayViewRef = v}
      >
        {/* 显示 筛选组件 */}
        <FilterPanel onSubmitFilter={handleSubmitFilter} options={state} onClose={() => overlayViewRef.close()} />
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }
  const handleSubmitFilter = (state) => {
    getSearch(state)
  }
  return (
    <ImageBackground
      style={{ flex: 1, position: 'relative' }}
      source={require('../../../res/search.gif')}
    >
      <StatusBar backgroundColor={"transparent"} translucent={true} />
      <TouchableOpacity
        style={{
          backgroundColor: "#fff", position: "absolute", right: "10%", top: "10%",
          width: pxToDp(55), height: pxToDp(55), borderRadius: pxToDp(27.5), alignItems: "center", justifyContent: "center",
          zIndex: 1000
        }}
        onPress={filterShow}
      >
        <IconFont style={{ color: "#912375", fontSize: pxToDp(30) }} name="iconshaixuan" />
      </TouchableOpacity>
      {list?.map(item => {
        const whMap = WHMap[getWidthHeight(item.dist)]
        const tx = Math.random() * (screenWidth - whMap.width)
        const ty = Math.random() * (screenHeight - whMap.height)
        return (
          <TouchableOpacity
            key={item.uid}
            style={{ position: 'absolute', top: ty, left: tx }}
          >
            <ImageBackground
              source={require('../../../res/showfirend.png')}
              style={{ ...whMap, position: 'relative', alignItems: 'center' }}
            >
              <Text
                numberOfLines={1}
                style={{
                  position: 'absolute',
                  top: -pxToDp(20),
                  color: '#ffffff9a'
                }}>{item.nick_name}</Text>
              <Image style={{ width: whMap.width, height: whMap.width, borderRadius: whMap.width / 2 }} source={{ uri: BASE_URI + item.header }} />
            </ImageBackground>
          </TouchableOpacity>
        )
      })}
    </ImageBackground>
  )
}