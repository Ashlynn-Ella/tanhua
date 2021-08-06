import React, { useEffect, useRef, useState } from 'react'
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { THNav } from '../../../component/tanhua-nav/index'
import Swiper from "react-native-deck-swiper"
import { useClinet } from '../../../utils/client'
import { FRIENDS_CARDS, BASE_URI, FRIENDS_LIKE } from '../../../utils/path-map'
import { IconFont } from '../../../component/icon-font/index'
import { pxToDp } from '../../../utils/styles-kits'
import Toast from '../../../utils/Toast'

export const TanHua = () => {
  const [cards, setCards] = useState([])
  const swiperRef = useRef()
  const { get } = useClinet()
  const [state, setState] = useState({
    page: 1,
    total: 1
  })
  let { page, total } = state
  const [cardIndex, setCardIndex] = useState(0)
  useEffect(() => {
    getCards()
  }, [page])
  //获取卡片数据
  const getCards = async () => {
    const res = await get(FRIENDS_CARDS, { pagesize: 5, page })
    console.log(res)
    setCards([...cards, ...res.data])
    setState({
      ...state,
      total: res.pages
    })
  }
  const SelectLike = (type) => {
    if (type === 'like') {
      swiperRef.current.swipeRight()
    } else {
      swiperRef.current.swipeLeft()
    }
    sendLike(type)
  }
  const sendLike = async (type) => {
    const id = cards[cardIndex].id
    const res = await get(`/friends/like/${id}/${type}`)
    Toast.message(res.data, 2000, 'center')
  }
  //卡片完成之后
  const onSwipedAll = () => {
    if (page >= total) {
      Toast.message('没有数据', 2000, 'center')
      return
    } else {
      setState({
        ...state,
        page: page + 1
      })
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <THNav title="探花" />
      <View>
        <ImageBackground
          style={{ height: '60%', backgroundColor: 'red' }}
          imageStyle={{ height: '100%', width: '100%' }}
          source={require('../../../res/testsoul_bg.png')}
        >
          {cards[cardIndex] ?
            <Swiper
              key={Date.now()}
              cards={cards}
              ref={swiperRef}
              renderCard={(card) => {
                return (
                  <View style={styles.card}>
                    <Image style={{ width: '100%', height: '75%' }} source={{ uri: BASE_URI + card?.header }} />
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'space-around' }}>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ color: "#555" }} >{card?.nick_name}</Text>
                        <IconFont style={{ fontSize: pxToDp(18), color: card?.gender === "女" ? "#b564bf" : "red" }}
                          name={card?.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
                        <Text style={{ color: "#555" }} >{card?.age}岁</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Text style={{ color: "#555" }} >{card?.marry}</Text>
                        <Text style={{ color: "#555" }} >|</Text>
                        <Text style={{ color: "#555" }} >{card?.xueli}</Text>
                        <Text style={{ color: "#555" }} >|</Text>
                        <Text style={{ color: "#555" }} >{card?.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                      </View>
                    </View>
                  </View>
                )
              }}
              horizontalSwipe={true}
              onSwiped={() => {
                setCardIndex(cardIndex + 1)
              }}
              onSwipedAll={onSwipedAll}
              cardIndex={cardIndex}
              onSwipedLeft={() => sendLike('dislike')}
              onSwipedRight={() => sendLike('like')}
              backgroundColor={'transparent'}
              cardVerticalMargin={0}
              stackSize={3}>
            </Swiper> : null
          }

        </ImageBackground>
      </View>
      <View style={{
        flexDirection: 'row', width: '60%',
        justifyContent: 'space-between', alignSelf: 'center',
        marginTop: pxToDp(50)
      }}>
        <TouchableOpacity
          style={{
            width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
            backgroundColor: '#ebc869', justifyContent: 'center', alignItems: 'center'
          }}
          onPress={() => SelectLike('dislike')}
        >
          <IconFont style={{ fontSize: pxToDp(30), color: '#fff' }} name="iconbuxihuan" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
            backgroundColor: '#fd5213', justifyContent: 'center', alignItems: 'center'
          }}
          onPress={() => SelectLike('like')}
        >
          <IconFont style={{ fontSize: pxToDp(30), color: '#fff' }} name="iconbuxihuan" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    height: '60%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
})
