
import React, { useEffect, useReducer, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native'
import { ImageHeaderScrollView } from 'react-native-image-header-scroll-view'
import { Carousel, Toast } from 'teaset-pro'
import { useClinet } from '../../../utils/client'
import { pxToDp } from '../../../utils/styles-kits'
import { BASE_URI } from '../../../utils/path-map'
import { IconFont } from '../../../component/icon-font/index'
import LinearGradient from "react-native-linear-gradient"
import ImageViewer from 'react-native-image-zoom-viewer'
import { useThrottle } from '../../../utils'
import { useMy } from '../../../context/my-context'
import JMessage from '../../../utils/JMessage'
import { useNavigation } from '@react-navigation/core'
import {PanelHeader} from '../../../component/panel'

export const Detail = (props) => {
  const { my } = useMy()
  const navigetion = useNavigation()
  //useReducer可以存储一些同步执行的变量，异步不行，再去文档研究一下，redux 
  const [detail, setDetail] = useState({
    detailData: {},
    trends: [],
    total: 0
  })
  const { detailData, trends, total } = detail
  const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }), {
    currentIndex: 0,
    showImage: false,
    imgUrls: [],
    toBottom: 0,
    pagesize: 2
  })
  const [page, setPage] = useState(1)
  let { currentIndex, showImage, imgUrls, toBottom, pagesize } = state
  const throttleVale = useThrottle(toBottom, 200)
  const { get } = useClinet()
  const id = props.route.params.id

  useEffect(() => {
    getDetail()
  }, [page])

  const getDetail = async () => {
    const res = await get(`/friends/personalInfo/${id}`, { page, pagesize })
    setDetail({
      detailData: res.data,
      trends: [...trends, ...res.data.trends],
      total: res.pages
    })
  }
  const clickImage = (tdIndex, imgIndex) => {
    const urls = trends[tdIndex].album.map(v => ({ url: BASE_URI + v.thum_img_path }))
    dispatch({
      currentIndex: imgIndex,
      showImage: true,
      imgUrls: urls
    })
  }
  const onScroll = ({ nativeEvent }) => {
    const isToBottom = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y
    dispatch({
      toBottom: isToBottom
    })
    if (throttleVale < 10 && page < total) {
      setPage(page + 1)
    }
  }
  const sendLike = async () => {
    const guid = detailData.guid
    const text = my.nick_name + '喜欢你'
    const extra = { user: JSON.stringify(detailData) }
    console.log(guid, text, extra, my)
    const res = await JMessage.sendTextMessage(guid, text, extra)
    Toast.smile('喜欢成功', 1000, 'center')
  }
  if (!detailData) return <></>
  return (
    <ImageHeaderScrollView
      onScroll={onScroll}
      maxHeight={pxToDp(220)}
      minHeight={pxToDp(44)}
      renderForeground={() => (
        <Carousel control style={{ height: pxToDp(220) }}>
          {detailData?.silder?.map(slider => {
            return (<Image
              key={slider.aid}
              source={{ uri: BASE_URI + slider.thum_img_path }}
              style={{ width: "100%", height: pxToDp(220) }}
            />)
          })}
        </Carousel>
      )}
    >
      <View style={{ backgroundColor: '#fff' }}>
        <View style={{ ...styles.flex, justifyContent: 'space-between', padding: pxToDp(10), borderBottomWidth: pxToDp(1), borderColor: "#ccc" }}>
          <View style={{ justifyContent: "space-around" }} >
            <View style={{ ...styles.flex }}>
              <Text style={{ color: "#555" }} >{detailData.nick_name}</Text>
              <IconFont style={{ marginLeft: pxToDp(5), marginRight: pxToDp(5), fontSize: pxToDp(18), color: detailData.gender === "女" ? "#b564bf" : "red" }}
                name={detailData.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
              <Text style={{ color: "#555" }} >{detailData.age}岁</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{detailData.marry}</Text>
              <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
              <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{detailData.xueli}</Text>
              <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
              <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{detailData.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
            </View>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ position: "relative", alignItems: "center", justifyContent: "center" }}>
              <IconFont name="iconxihuan" style={{ fontSize: pxToDp(50), color: "red" }} />
              <Text style={{ position: "absolute", color: "#fff", fontSize: pxToDp(13), fontWeight: "bold" }} >{detailData.fateValue}</Text>
            </View>
            <Text style={{ color: "red", fontSize: pxToDp(13) }} >缘分值</Text>
          </View>
        </View>
        <View style={{ padding: pxToDp(10) }}>
          <View style={{
            ...styles.flex, justifyContent: 'space-between', paddingBottom: pxToDp(10),
            borderBottomWidth: pxToDp(1), borderColor: "#ccc"
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#666' }}>动态</Text>
              <View style={{
                backgroundColor: "red", width: pxToDp(18), height: pxToDp(18),
                borderRadius: pxToDp(9), ...styles.flex, justifyContent: 'center',
                marginLeft: pxToDp(5)
              }}>
                <Text style={{ color: "#fff", lineHeight: pxToDp(18) }}>{trends.length}</Text>
              </View>
            </View>
            <View style={{ ...styles.flex }}>
              <TouchableOpacity
                style={{ ...styles.flexCenter }}
                onPress={() => navigetion.navigate('Chat', detailData)}
              >
                <LinearGradient
                  colors={["#f2ab5a", "#ec7c50"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: pxToDp(100), height: pxToDp(40), borderRadius: pxToDp(20),
                    flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly"
                  }}
                >
                  <IconFont style={{ color: '#fff' }} name="iconliaotian" />
                  <Text style={{ color: '#fff' }}>聊一下</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.flexCenter, marginLeft: pxToDp(10) }}
                onPress={sendLike}
              >
                <LinearGradient
                  colors={["#6d47f8", "#e56b7f"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: pxToDp(100), height: pxToDp(40), borderRadius: pxToDp(20),
                    flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly"
                  }}
                >
                  <IconFont style={{ color: '#fff' }} name="iconxihuan-o" />
                  <Text style={{ color: '#fff' }}>喜欢</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          {trends?.map((trend, tdIndex) => {
            return (
              <View
                key={tdIndex}
                style={{ paddingTop: pxToDp(15), paddingBottom: pxToDp(15), borderBottomWidth: pxToDp(1), borderColor: "#ccc" }}>
                <PanelHeader detailData={detailData} />
                <View style={{ marginTop: pxToDp(8) }}>
                  <Text numberOfLines={3} >{trend.content}</Text>
                </View>
                <View style={{ ...styles.flex, flexWrap: 'wrap', paddingTop: pxToDp(5) }}>
                  {
                    trend.album?.map((img, imgIndex) => {
                      return (
                        <TouchableOpacity
                          key={imgIndex}
                          onPress={() => clickImage(tdIndex, imgIndex)}
                        >
                          <Image
                            style={{ width: pxToDp(70), height: pxToDp(70), marginRight: pxToDp(5) }}
                            source={{ uri: BASE_URI + img.thum_img_path }}
                          />
                        </TouchableOpacity>
                      )
                    })
                  }
                </View>
              </View>
            )
          })}
          {page >= total ? <View style={{ height: pxToDp(60), justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: "#666" }}>没有更多数据了</Text></View> : null}
        </View>
        <Modal visible={showImage} transparent={true}>
          <ImageViewer onClick={() => dispatch({ showImage: false })} imageUrls={imgUrls} index={currentIndex} />
        </Modal>
      </View>
    </ImageHeaderScrollView>
  )
}

const styles = StyleSheet.create({
  flex: { flexDirection: 'row', alignItems: 'center' },
  flexCenter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
})