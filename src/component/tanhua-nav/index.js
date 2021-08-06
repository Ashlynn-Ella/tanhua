import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, StatusBar } from 'react-native';
import { pxToDp } from '../../utils/styles-kits';
import { IconFont } from '../icon-font/index'
import { useNavigation } from '@react-navigation/native'


export const THNav = ({ title }) => {
  const navigation = useNavigation()
  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ImageBackground source={require('../../res/headbg.png')} style={styles.image}>
        <TouchableOpacity
          style={{ width: pxToDp(80), flexDirection: "row", alignItems: 'center' }}
        >
          <IconFont name="iconfanhui" style={styles.hdtext} />
          <Text style={styles.hdtext} onPress={() => navigation.goBack()}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.hdtext}>{title}</Text>
        <Text style={{ width: pxToDp(80) }}></Text>
      </ImageBackground>

    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: pxToDp(60), paddingTop: pxToDp(12),
    flexDirection: 'row', paddingLeft: pxToDp(10),
    alignItems: 'center', justifyContent: 'space-between'
  },
  hdtext: {
    color: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
})