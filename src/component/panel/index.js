import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { IconFont } from "../icon-font"
import { pxToDp } from "../../utils/styles-kits"
import { BASE_URI } from "../../utils/path-map"

export const PanelHeader = ({ detailData }) => {
  return (
    <View style={{ flexDirection: "row",width:'90%'}}>
      <View
        style={{ paddingRight: pxToDp(15) }}
      ><Image
          style={{ width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20) }}
          source={{ uri: BASE_URI + detailData.header }} /></View>
      <View style={{ flex: 2, justifyContent: "space-around" }} >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
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
    </View>
  )

}
const styles = StyleSheet.create({
  flex: { flexDirection: 'row', alignItems: 'center' },
  flexCenter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
})