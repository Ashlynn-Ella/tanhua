import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useClinet } from '../../../../utils/client'
import { FRIENDS_TODAYBEST, BASE_URI } from '../../../../utils/path-map'
import { pxToDp } from '../../../../utils/styles-kits'
import { IconFont } from '../../../../component/icon-font/index'


export const PerfectGirl = () => {
  const { get } = useClinet()
  const [perfectGirl, setPerfectGirl] = useState({})
  // id: 16
  // header: "/upload/13828459788.jpg"
  // nick_name: "若只如初见っ"
  // gender: "女"
  // age: 23
  // marry: "单身"
  // xueli: "大专"
  // dist: 246.1
  // agediff: 0
  // fateValue: 78
  useEffect(async () => {
    const res = await get(FRIENDS_TODAYBEST)
    setPerfectGirl(res.data)
  }, [])
  return (
    <View style={{ flexDirection: 'row', padding: pxToDp(5) }}>
      <View style={{ position: 'relative', paddingRight: pxToDp(10) }}>
        <Image
          style={{ width: pxToDp(120), height: pxToDp(120) }}
          source={{ uri: BASE_URI + '/upload/161672248773113412000003.jpg' }} />
        <View
          style={{
            width: pxToDp(70), height: pxToDp(20), backgroundColor: "#b564bf",
            justifyContent: "center", alignItems: "center", borderRadius: pxToDp(5),
            position: "absolute", left: 0, bottom: pxToDp(10)
          }}
        >
          <Text style={{ color: "#fff", fontSize: pxToDp(14) }}>今日佳人</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 2, justifyContent: 'space-around' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#555' }}>{'安安'}</Text>
            <IconFont style={{ fontSize: pxToDp(18), color: "#b564bf" }} name='icontanhuanv' />
            <Text>23岁</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: "#555" }} >单身</Text>
            <Text style={{ color: "#555" }} >|</Text>
            <Text style={{ color: "#555" }} >大专</Text>
            <Text style={{ color: "#555" }} >|</Text>
            <Text style={{ color: "#555" }} >{3 < 10 ? "年龄相仿" : "有点代沟"}</Text>
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <IconFont style={{ fontSize: pxToDp(50), color: "red" }} name='iconxihuan' />
            <Text style={{position:"absolute",color:"#fff",fontSize:pxToDp(13),fontWeight:"bold"}}>78</Text>
          </View>
          <Text style={{ color: 'red', fontSize: pxToDp(13) }}>缘分值</Text>
        </View>
      </View>
    </View>
  )
}