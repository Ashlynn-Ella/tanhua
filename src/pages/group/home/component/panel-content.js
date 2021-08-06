import React, { useState } from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import { IconFont } from "../../../../component/icon-font"
import { pxToDp } from "../../../../utils/styles-kits"
import { BASE_URI, QZ_DT_DZ,QZ_DT_XH } from "../../../../utils/path-map"
import { PanelHeader } from '../../../../component/panel'
import dayjs from "../../../../utils/day"
import { useClinet } from "../../../../utils/client"
import { Toast } from "teaset-pro"
import { useMy } from "../../../../context/my-context"
import JMessage from '../../../../utils/JMessage'

export const PanelContent = ({ detail, show }) => {
  const detailData = detail.item
  const { get } = useClinet()
  // const { my } = useMy()
  const [startCount, setStartCount] = useState(detailData.star_count)
  const sendStart = async (data) => {
    const url = QZ_DT_DZ.replace(':id', data.tid)
    const res = await get(url)
    setStartCount(res.data.start_count)
    if (res.data.iscancelstar) {
      Toast.smile('点赞取消成功')
    } else {
      Toast.smile('点赞成功')
      // const text = `${my.nick_name}点赞了你的动态`
      // const extras = { user: JSON.stringify(my) }
      // await JMessage.sendTextMessage(data.guid, text, extras)
    }
  }
  const sendLike = async (data) => {
    const url = QZ_DT_XH.replace(':id',data.tid)
    const res = await get(url)
    console.log(res)
  }
  return (
    <View>
      <View
        style={{ padding: pxToDp(15), borderBottomWidth: pxToDp(1), borderBottomColor: "#ccc" }}>
        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
          <PanelHeader detailData={detailData} />
          <TouchableOpacity>
            <IconFont style={{ color: "#666", fontSize: pxToDp(20) }} name="icongengduo" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: pxToDp(8) }}>
          <Text numberOfLines={3} >{detailData.content}</Text>
        </View>
        <View style={{ ...styles.flex, flexWrap: 'wrap', paddingTop: pxToDp(5) }}>
          {
            detailData.images?.map((img, imgIndex) => {
              return (
                <TouchableOpacity
                  key={imgIndex}
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
        <View style={{ ...styles.flex, marginTop: pxToDp(5), marginBottom: pxToDp(5) }}>
          <Text style={styles.text}>距离{detailData.dist / 1000} km</Text>
          <Text style={styles.text}>{dayjs(detailData.create_time).fromNow()}</Text>
        </View>
        <View style={{ ...styles.flex, justifyContent: 'space-between', marginTop: pxToDp(5) }}>
          <TouchableOpacity
            onPress={sendStart.bind(this, detailData)}
            style={{ ...styles.flex }}>
            <IconFont style={{ color: '#666' }} name="icondianzan-o" />
            <Text style={styles.text}>{startCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ ...styles.flex }}>
            <IconFont name="iconpinglun" />
            <Text style={styles.text}>{detailData.comment_count}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={sendLike.bind(this, detailData)}
            style={{ ...styles.flex }}>
            <IconFont name="iconxihuan-o" />
            <Text style={styles.text}>{detailData.like_count}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {show ? <View
        style={{ height: pxToDp(30), alignItems: 'center', justifyContent: 'center' }}
      ><Text style={{ color: "#666" }} >没有更多数据</Text></View> : null}
    </View>
  )

}
const styles = StyleSheet.create({
  flex: { flexDirection: 'row', alignItems: 'center' },
  flexCenter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#666', marginRight: pxToDp(10) }
})