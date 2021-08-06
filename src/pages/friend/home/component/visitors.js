import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { pxToDp } from '../../../../utils/styles-kits'
import { FRIENDS_VISITORS, BASE_URI } from '../../../../utils/path-map'
import { useClinet } from '../../../../utils/client'

export const Visitor = () => {
  const [visitors, setVisitor] = useState()
  const { get } = useClinet()
  useEffect(async () => {
    const res = await get(FRIENDS_VISITORS)
    if (res.code === '10000') {
      setVisitor(res.data)
    }
  }, []);
  //       {
  //         target_uid: 7
  // uid: 8
  // nick_name: "雾霭朦胧"
  // age: 21
  // xueli: "大专"
  // marry: "未婚"
  // gender: "女"
  // Distance: 0
  // header: "/upload/13828459782.png"
  // agediff: -2
  // fateValue: 82
  //       }
  return (
    <View style={{
      paddingLeft: pxToDp(5), paddingRight: pxToDp(5),
      flexDirection: "row", marginTop: pxToDp(20), alignItems: "center", justifyContent: 'center'
    }} >
      <Text style={{ flex: 1, color: "#777", fontSize: pxToDp(14) }}>最近有{visitors?.length}人来访,快去看看...</Text>
      <View style={{ flexDirection: 'row' }}>
        {visitors?.map(item => {
          return (
            <Image key={item.uid} style={{
              width: pxToDp(40), height: pxToDp(40),
              borderRadius: pxToDp(20)
            }} source={{ uri: BASE_URI + item.header }} />
          )
        })}

      </View>
      <Text style={{ fontSize: pxToDp(14), color: "#777" }}>&gt;</Text>
    </View>
  )
}

const style = StyleSheet.create({

})