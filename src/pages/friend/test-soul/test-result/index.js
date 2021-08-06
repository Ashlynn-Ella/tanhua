import React from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, ScrollView } from 'react-native'
import { THNav } from '../../../../component/tanhua-nav/index'
import { THbutton } from '../../../../component/button/index'
import { pxToDp } from '../../../../utils/styles-kits'
import { BASE_URI } from '../../../../utils/path-map'
import { useNavigation } from '@react-navigation/native'

export const TestRes = (props) => {
  const navigation = useNavigation()
  const params = props.route.params
  return (
    <ImageBackground
      style={{ flex: 1, width: '100%' }}
      source={require('../../../../res/qabg.png')}
    >
      <THNav title="测试结果" />
      <ImageBackground
        resizeMode='stretch'
        style={{ flex: 1, width: '100%', position: 'relative' }}
        source={require('../../../../res/result.png')}
      >
        <Text style={{
          ...styles.text, position: 'absolute',
          left: '5%', top: '1%',
          letterSpacing: pxToDp(7)
        }}>灵魂基因鉴定单</Text>
        <View style={{
          flexDirection: 'row', position: 'absolute',
          right: '5%', top: '7%', justifyContent: 'space-between',
          width: '47%'
        }}>
          <Text style={{ color: '#fff', fontSize: pxToDp(16) }}>[</Text>
          <Text style={{ color: '#fff', fontSize: pxToDp(16) }}>{params.currentUser.nick_name}</Text>
          <Text style={{ color: '#fff', fontSize: pxToDp(16) }}>]</Text>
        </View>
        <ScrollView
          style={{
            position: 'absolute',
            right: '5%', top: '12%',
            width: '47%', height: '26%'
          }}
        >
          <Text style={{ color: '#fff' }}>{params.content}</Text>
        </ScrollView>
        <View style={{ position: "absolute", left: "5%", top: "42.5%" }}>
          <Text style={{ color: "#ffffff9a" }} >外向</Text>
          <Text style={{ color: "#ffffff9a" }} >{params.extroversion}%</Text>
        </View>
        <View style={{ position: "absolute", left: "5%", top: "49%" }}>
          <Text style={{ color: "#ffffff9a" }} >判断</Text>
          <Text style={{ color: "#ffffff9a" }} >{params.judgment}%</Text>
        </View>
        <View style={{ position: "absolute", left: "5%", top: "55.5%" }}>
          <Text style={{ color: "#ffffff9a" }} >抽象</Text>
          <Text style={{ color: "#ffffff9a" }} >{params.abstract}%</Text>
        </View>
        <View style={{ position: "absolute", right: "5%", top: "43%" }}>
          <Text style={{ color: "#ffffff9a" }} >理性</Text>
          <Text style={{ color: "#ffffff9a" }} >{params.rational}%</Text>
        </View>
        <Text style={{
          color: "#ffffff9a", position: "absolute", left: "5%",
          top: "69%"
        }} >与你相似</Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}
          style={{ position: 'absolute', width: "96%", height: "11%", left: "2%", top: "72%" }}
        >
          <Image style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25), marginLeft: pxToDp(5) }} source={{ uri: BASE_URI + params.currentUser.header }} />
          <Image style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25), marginLeft: pxToDp(5) }} source={{ uri: BASE_URI + params.currentUser.header }} />
          <Image style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25), marginLeft: pxToDp(5) }} source={{ uri: BASE_URI + params.currentUser.header }} />
          <Image style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25), marginLeft: pxToDp(5) }} source={{ uri: BASE_URI + params.currentUser.header }} />
          <Image style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25), marginLeft: pxToDp(5) }} source={{ uri: BASE_URI + params.currentUser.header }} />
          <Image style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25), marginLeft: pxToDp(5) }} source={{ uri: BASE_URI + params.currentUser.header }} />
          <Image style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25), marginLeft: pxToDp(5) }} source={{ uri: BASE_URI + params.currentUser.header }} />
          <Image style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25), marginLeft: pxToDp(5) }} source={{ uri: BASE_URI + params.currentUser.header }} />
        </ScrollView>
        <THbutton
          onPress={() => navigation.navigate('TestSoul')}
          style={{
            position: "absolute",
            width: "80%", height: pxToDp(40), bottom: pxToDp(20),
            alignSelf: "center"
          }}>开始测试</THbutton>
      </ImageBackground>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  text: { color: '#ffffff9a' }
})