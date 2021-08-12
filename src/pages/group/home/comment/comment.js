import React, { useEffect, useState, useReducer, useCallback, useRef } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput, ScrollView } from "react-native"
import { PanelContent } from '../component/panel-content'
import { THNav } from '../../../../component/tanhua-nav'
import LinearGradient from "react-native-linear-gradient"
import { IconFont } from '../../../../component/icon-font'
import { pxToDp } from "../../../../utils/styles-kits"
import { useClinet } from "../../../../utils/client"
import { QZ_DT_PL, BASE_URI, QZ_DT_PL_TJ, QZ_DT_PL_DZ } from '../../../../utils/path-map'
import dayjs from "dayjs"
import { Toast } from "teaset-pro"
import { useThrottle } from "../../../../utils"

export const Comment = (props) => {
  const [text, setText] = useState()
  const detail = props.route.params
  const [state, dispatch] = useReducer((state, action) => ({ ...state, ...action }), {
    commentList: [],
    counts: '',
    showInput: true,
    total: '',
    toBottom: '',
    isNew: false,
    page: 1,
    pagesize: 6,
    show: false
  })
  const { counts, commentList, showInput, total, toBottom, isNew, page, pagesize, show } = state
  const throttleVale = useThrottle(toBottom, 100)
  const { get, run } = useClinet()
  const inputRef = useRef()
  useEffect(() => {
    getComments()
  }, [page, pagesize, getComments, isNew]);
  const getComments = useCallback(async () => {
    const url = QZ_DT_PL.replace(":id", detail.tid)
    const res = await get(url, { page, pagesize })
    if (isNew) {
      dispatch({
        commentList: res.data,
        counts: res.counts,
        total: res.pages
      })
    } else {
      dispatch({
        commentList: [...commentList, ...res.data],
        counts: res.counts,
        total: res.pages
      })
    }
  }, [page, pagesize, dispatch, isNew])
  const handleSubmit = async () => {
    if (!text.trim()) {
      Toast.sad('内容不能为空')
    }
    const url = QZ_DT_PL_TJ.replace(':id', detail.tid)
    const res = await run(url, { comment: text })
    Toast.smile(res.data)
    dispatch({
      showInput: false,
      isNew: true,
      page: 1
    })
  }
  const onScroll = ({ nativeEvent }) => {
    const isToBottom = nativeEvent.contentSize.height - nativeEvent.layoutMeasurement.height - nativeEvent.contentOffset.y
    dispatch({
      toBottom: isToBottom
    })
    if (page >= total) {
      dispatch({
        show: true
      })
      return
    }
    if (throttleVale < 20) {
      dispatch({
        isNew: false,
        page: page + 1
      })
    }
  }
  const handleStart = async (id) => {
    const url = QZ_DT_PL_DZ.replace(':id', id)
    const res = await get(url)
    console.log(res.data.star_count)
    Toast.smile('点赞成功')
    dispatch({
      isNew: true,
      page: 1
    })

  }
  return (
    <ScrollView
      onScroll={onScroll}
      style={{ flex: 1 }}>
      <THNav title="最新评论" />
      <PanelContent detail={detail} noMore={true} />
      <View style={{
        ...styles.flex, justifyContent: 'space-between', paddingLeft: pxToDp(15), paddingRight: pxToDp(15)
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#666' }}>最新评论</Text>
          <View style={{
            backgroundColor: "red", width: pxToDp(20), height: pxToDp(20),
            borderRadius: pxToDp(10), ...styles.flex, justifyContent: 'center',
            marginLeft: pxToDp(5)
          }}>
            <Text style={{ color: "#fff", lineHeight: pxToDp(20) }}>{counts}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{ ...styles.flexCenter }}
          activeOpacity={1}
          onPress={() => dispatch({ showInput: true })}
        >
          <LinearGradient
            colors={['#9b63cd', '#e0708c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: pxToDp(100), height: pxToDp(25), borderRadius: pxToDp(20),
              flexDirection: "row", alignItems: 'center', justifyContent: "space-evenly"
            }}
          >
            <IconFont style={{ color: '#fff' }} name="iconliaotian" />
            <Text style={{ color: '#fff' }}>发表评论</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View>
        {commentList?.map((v, i) => {
          return <View
            key={i}
            style={{
              flexDirection: "row", padding: pxToDp(15),
              borderBottomColor: "#ccc", borderBottomWidth: pxToDp(1), alignItems: "center"
            }}
          >
            <View style={{ paddingRight: pxToDp(10) }}>
              <Image style={{ width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20) }} source={{ uri: BASE_URI + v.header }} />
            </View>
            <View>
              <Text style={{ color: "#666" }}>{v.nick_name}</Text>
              <Text style={{ color: "#666", fontSize: pxToDp(13), marginTop: pxToDp(5), marginBottom: pxToDp(5) }}>{dayjs(v.create_time).format("YYYY-MM-DD HH:mm:ss")}</Text>
              <Text>{v.content}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleStart(v.cid)}
              style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end", alignItems: "center" }}>
              <IconFont style={{ color: "#666", fontSize: pxToDp(13) }} name="icondianzan-o" />
              <Text style={{ color: "#666" }}>{v.star}</Text>
            </TouchableOpacity>
          </View>
        })}
        {show ? <View
          style={{ height: pxToDp(30), alignItems: 'center', justifyContent: 'center' }}
        ><Text style={{ color: "#666" }} >没有更多数据</Text></View> : null}
      </View>
      <Modal
        visible={showInput}
        transparent={true}
        animationType="slide"
        onRequestClose={() => dispatch({ showInput: false })}
      >
        <TouchableOpacity
          onPress={() => dispatch({ showInput: false })}
          style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", position: "relative" }}>
          <View style={{
            backgroundColor: "#eee", flexDirection: "row", alignItems: "center",
            position: "absolute", width: "100%", left: 0, bottom: 0, padding: pxToDp(5)
          }} >
            <TextInput
              value={text}
              // autoFocus={true}
              ref={inputRef}
              onChangeText={setText}
              onSubmitEditing={handleSubmit}
              placeholder="发表评论"
              style={{ backgroundColor: "#fff", flex: 5, borderRadius: pxToDp(18), height: pxToDp(40) }} />
            <Text
              onPress={handleSubmit}
              style={{ flex: 1, textAlign: "center", color: "#666" }} >发布</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  flex: { flexDirection: 'row', alignItems: 'center' },
  flexCenter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }
})