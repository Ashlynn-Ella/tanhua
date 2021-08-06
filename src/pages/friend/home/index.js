import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, Image } from 'react-native'
import { ImageHeaderScrollView } from 'react-native-image-header-scroll-view'
import { pxToDp } from '../../../utils/styles-kits'
import { FriendHeader } from './component/header'
import { Visitor } from './component/visitors'
import { PerfectGirl } from './component/perfect-girl'
import { IconFont } from '../../../component/icon-font/index'
import { useClinet } from '../../../utils/client'
import { FRIENDS_RECOMMEND, BASE_URI } from '../../../utils/path-map'
import { Overlay } from 'teaset-pro'
import { FilterPanel } from './component/filter-panel'
import { useNavigation } from '@react-navigation/core'

export const Friend = () => {
  const [recommends, setRecommends] = useState([])
  const { get } = useClinet()
  const navigation = useNavigation()
  // const [toBottom, setToBottom] = useState(0)
  const [options, setOptions] = useState({
    page: 28,
    pagesize: 25,
    gender: "男",
    distance: 2,
    lastLogin: "",
    city: "",
    education: ""
  });
  let total = 1
  useEffect(() => {
    getCommends()
  }, [])
  //获取列表数据
  const getCommends = async (filterData = {}) => {
    try {
      const res = await get(FRIENDS_RECOMMEND, { ...options, ...filterData })
      if (res.code === '000004') {
        navigation.navigate('Login')
        return
      }
      total = res.pages
      setRecommends([...res.data])
    } catch (err) {
      console.log(err)
    }

  }
  const handleSubmitFilter = (filterData) => {
    getCommends(filterData)
  }
  const filterShow = () => {
    let overlayViewRef = null;
    let overlayView = (
      <Overlay.View
        modal={true}
        overlayOpacity={0.4}
        ref={v => overlayViewRef = v}
      >
        {/* 显示 筛选组件 */}
        <FilterPanel onSubmitFilter={handleSubmitFilter} options={options} setOptions={setOptions} onClose={() => overlayViewRef.close()} />
      </Overlay.View>
    );
    Overlay.show(overlayView);
  }
  const onScroll = ({ nativeEvent }) => {
    const isToBottom = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y
    // setToBottom({
    //   toBottom: isToBottom
    // })
    // if (throttleVale < 10 && options.page < total) {
    //   setOptions({
    //     page: options.page + 1
    //   })
    // }
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageHeaderScrollView
        maxHeight={pxToDp(145)}
        minHeight={pxToDp(44)}
        headerImage={require("../../../res/headfriend.png")}
        onScroll={onScroll}
        renderForeground={() => (
          <View style={{ height: pxToDp(130), justifyContent: "center", alignItems: "center" }} >
            <StatusBar backgroundColor="transparent" translucent={true} />
            <FriendHeader />
          </View>
        )}
      >
        <View>
          <Visitor />
          <PerfectGirl />
          <View>
            <View style={{
              height: pxToDp(40), flexDirection: 'row', justifyContent: 'space-between',
              paddingLeft: pxToDp(10), paddingRight: pxToDp(10), alignItems: 'center', backgroundColor: '#eee'
            }}>
              <Text style={{ color: '#666' }}>推荐</Text>
              <IconFont style={{ color: '#666' }} name="iconshaixuan" onPress={filterShow} />
            </View>
            <View>
              {recommends?.map((item, index) => {
                return (
                  <TouchableOpacity activeOpacity={0.8} key={index}
                    onPress={() => navigation.navigate('Detail', { id: item.id })}
                    style={{
                      flexDirection: "row", paddingTop: pxToDp(15), paddingRight: pxToDp(15),
                      paddingBottom: pxToDp(15), borderBottomWidth: pxToDp(1), borderColor: "#ccc"
                    }} >
                    <View style={{ paddingLeft: pxToDp(15), paddingRight: pxToDp(15) }}>
                      <Image style={{ borderRadius: pxToDp(25), width: pxToDp(50), height: pxToDp(50) }} source={{ uri: BASE_URI + item?.header }} />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'space-around' }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text>{item.nick_name}</Text>
                        <IconFont style={{ fontSize: pxToDp(18), color: item.gender === '女' ? "#b564bf" : 'red' }} name='icontanhuanv' />
                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: "#555" }} >{item.marry}</Text>
                        <Text style={{ color: "#555" }} >|</Text>
                        <Text style={{ color: "#555" }} >{item.xueli}</Text>
                        <Text style={{ color: "#555" }} >|</Text>
                        <Text style={{ color: "#555" }} >{item.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: pxToDp(60) }}>
                      <IconFont style={{ fontSize: pxToDp(30), color: "red" }} name='iconxihuan' />
                      <Text>{item.fateValue}</Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        </View>
      </ImageHeaderScrollView>
    </View>
  )
}