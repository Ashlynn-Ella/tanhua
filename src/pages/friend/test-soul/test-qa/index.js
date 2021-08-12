import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import { THNav } from '../../../../component/tanhua-nav'
import { useClinet } from '../../../../utils/client'
import { pxToDp } from '../../../../utils/styles-kits'
import LinearGradient from 'react-native-linear-gradient'
import { useMy } from '../../../../context/my-context'
import { BASE_URI, FRIENDS_QUESTIONANS } from '../../../../utils/path-map'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { admin } from '../../../../store/user.slice'

export const TestQA = (props) => {
  const [quesList, setQuesList] = useState([])
  const [index, setIndex] = useState(0)
  // const { my } = useMy()
  const my = useSelector(admin)
  const { get, run } = useClinet()
  const navigation = useNavigation()
  const question = props.route.params
  const titles = {
    "初级": require("../../../../res/leve1.png"),
    "中级": require("../../../../res/leve2.png"),
    "高级": require("../../../../res/leve3.png")
  }
  let anList = []
  useEffect(async () => {
    const res = await get(`/friends/questionSection/${question.qid}`)
    setQuesList([...res.data])
  }, [])
  const chooseAns = async (ans) => {
    anList.push(ans)
    if (index >= quesList.length - 1) {
      const url = FRIENDS_QUESTIONANS.replace(":id", question.qid)
      const answers = anList.join(",")
      const res = await run(url, { answers })
      console.log(res)
      navigation.navigate('TestRes', res.data)
    } else {
      setIndex(index + 1)
    }

  }
  if (!quesList[index]) return <></>
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <THNav title="初级测试题" />
      <ImageBackground
        source={require("../../../../res/qabg.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: pxToDp(60) }}>
          <ImageBackground
            style={{
              width: pxToDp(66), height: pxToDp(52),
              justifyContent: 'center', alignItems: 'flex-end'
            }}
            source={require('../../../../res/qatext.png')}
          >
            <Image style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(50) }} source={{ uri: BASE_URI + my.header }} />
          </ImageBackground>
          <ImageBackground
            style={{
              width: pxToDp(66), height: pxToDp(52),
              justifyContent: 'center', alignItems: 'center'
            }}
            source={titles[question.type]}
          ></ImageBackground>
        </View>
        <View style={{ position: 'absolute', top: pxToDp(60), width: '80%', alignSelf: 'center', justifyContent: 'center' }}>
          <View>
            <Text style={{ fontSize: pxToDp(26), color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>第{index + 1}题</Text>
            <Text style={{ color: '#ffffff9a', textAlign: 'center' }}>({index + 1}/{quesList.length})</Text>
          </View>
          <Text style={{
            marginTop: pxToDp(30),
            fontSize: pxToDp(14), color: "#fff", fontWeight: "bold"
          }}>{quesList[index].question_title}</Text>
          {
            quesList[index].answers?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => chooseAns(item.ans_No)}
                  key={index}
                  style={{ marginTop: pxToDp(20) }}
                >
                  <LinearGradient
                    colors={["#6f45f3", "#6f45f31a"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ height: pxToDp(40), borderRadius: pxToDp(6), alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Text style={{ color: "#fff" }}>
                      {item?.ans_title}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )
            })
          }

        </View>

      </ImageBackground>
    </View>
  )
}