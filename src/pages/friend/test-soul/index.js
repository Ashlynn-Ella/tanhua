import React, { useEffect, useReducer, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native'
import { THNav } from '../../../component/tanhua-nav/index'
import Swiper from "react-native-deck-swiper"
import { useClinet } from '../../../utils/client'
import { FRIENDS_QUESTIONS, BASE_URI } from '../../../utils/path-map'
import { THbutton } from '../../../component/button/index'
import { pxToDp } from '../../../utils/styles-kits'
import { Toast } from 'teaset-pro'
import { useNavigation } from '@react-navigation/native'
export const TestSoul = () => {
  const [questions, setQuestions] = useState([])
  const [cardIndex, setCardIndex] = useState(0)
  const { get } = useClinet()
  const navigation = useNavigation()
  useEffect(() => {
    getQuestions()
  }, [])
  const getQuestions = async () => {
    const res = await get(FRIENDS_QUESTIONS)
    setQuestions([...questions, ...res.data])
  }
  const onSwipedAll = () => {
    Toast.message('没有数据了', 2000, 'center')
    getQuestions()
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <THNav title="测灵魂" />
      <ImageBackground
        source={require("../../../res/testsoul_bg.png")}
        style={{ width: '100%', height: '60%' }}
        imageStyle={{ height: '100%' }}
      >
        {questions.length ? <Swiper
          key={Date.now()}
          cards={questions}
          renderCard={(card) => {
            return (
              <View style={styles.card}>
                <Image style={{ width: "100%", height: "100%" }} source={{ uri: BASE_URI + card?.imgpath }} />
              </View>
            )
          }}
          onSwiped={() => setCardIndex(cardIndex + 1)}
          onSwipedAll={onSwipedAll}
          cardIndex={cardIndex}
          cardVerticalMargin={0}
          backgroundColor={'transparent'}
          stackSize={1}>
        </Swiper> : <></>}
      </ImageBackground>
      <THbutton
        onPress={() => navigation.navigate('TestQA', questions[cardIndex])}
        style={{
          position: "absolute",
          width: "80%", height: pxToDp(40), bottom: pxToDp(20),
          alignSelf: "center"
        }}>开始测试</THbutton>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: '80%',
    borderRadius: 4,
    justifyContent: "center",
    backgroundColor: "white",
    zIndex: 9999
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
})