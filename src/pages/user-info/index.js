import React, { useState, useEffect, useMount } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { pxToDp } from '../../utils/styles-kits'
import SvgUri from 'react-native-svg-uri'
import { male, female } from '../../res/fonts/iconSvg'
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import dayjs from 'dayjs';
import Geo from '../../utils/geo'
import Picker from 'react-native-picker'
import cityData from '../../res/citys.json'
import { THbutton } from '../../component/button/index'
import Toast from '../../utils/Toast'
import { Overlay } from 'teaset-pro'
import ImagePicker from 'react-native-image-crop-picker'
import { useClinet } from '../../utils/client'
import { ACCOUNT_CHECKHEADIMAGE, ACCOUNT_REGINFO } from '../../utils/path-map'
import JMessage from '../../utils/JMessage'
import { useAuth } from '../../context/user-context'
import { useNavigation } from '@react-navigation/core';


export const UserInfo = () => {
  const { mobile, userId } = useAuth()
  const { run } = useClinet()
  const [gender, setGender] = useState(1)
  const [nickname, setNickname] = useState()
  const [birthday, setDate] = useState()
  const navigation = useNavigation()
  const [cityParams, setCityParams] = useState({
    city: '未知',
    lng: '',
    lat: '',
    address: ''
  })
  const maxDate = dayjs(new Date()).format('YYYY-MM-DD')
  useEffect(async () => {
    const res = await Geo.getCityByLocation()
    const city = res.regeocode.addressComponent.province
    const address = res.regeocode.formatted_address;
    const lng = res.regeocode.addressComponent.streetNumber.location.split(",")[0];
    const lat = res.regeocode.addressComponent.streetNumber.location.split(",")[1];
    setCityParams({
      city,
      address,
      lng,
      lat
    })
  }, [])
  const showPicker = () => {
    Picker.init({
      pickerData: cityData,
      selectedValue: ["北京", "北京"],
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择城市",
      onPickerConfirm: data => {
        setCityParams({
          ...cityParams,
          city: `${data[1]}市`
        })
      }
    });
    Picker.show()
  }
  const upLoadImage = async (image) => {
    let formData = new FormData()
    formData.append('headPhoto', {
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop()
    })
    return run(ACCOUNT_CHECKHEADIMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  }
  const changeImg = async () => {
    if (!nickname || !cityParams.city || !birthday) {
      Toast.sad("昵称或者生日或者城市不合法", 2000, 'center')
      return
    }
    //选择图片
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    })
    let overlayViewRef = null
    let overlayView = (
      <Overlay.View
        style={{
          flex: 1, backgroundColor: '#000', justifyContent: 'center',
          alignItems: "center"
        }}
        modal={true}
        overlayOpacity={0}
        ref={v => overlayViewRef = v}
      >
        <View style={{
          marginTop: pxToDp(30),
          width: pxToDp(334),
          height: pxToDp(334),
          position: "relative",
          justifyContent: 'center',
          alignItems: "center"
        }}>
          <Image style={{
            width: "100%", height: "100%",
            position: 'absolute', left: 0, top: 0, zIndex: 100
          }} source={require("../../res/scan.gif")} />
          <Image source={{ uri: image.path }} style={{ width: '60%', height: '60%' }} />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);
    console.log('图片信息',image)
    //上传图片
    const resImage = await upLoadImage(image)
    console.log('上传后返回信息',resImage)
    if (resImage.code !== '10000') {
      Toast.sad('上传图片失败', 2000, 'center')
      return
    }
    const header = resImage.data.headImgPath
    const userinfo = await run(ACCOUNT_REGINFO, { ...cityParams, header, mobile, userId, gender, nickname, birthday })
    if (userinfo.code !== '10000') {
      return
    }
    //极光注册
    const Jmessage = await JMessage.register(userId, mobile)
    console.log(Jmessage)
    overlayViewRef.close()
    Toast.smile('恭喜 操作成功', 2000, 'center')
    navigation.reset({
      routes: [{ name: "Tabbar" }]
    })
  }

  return (
    <View style={{ backgroundColor: '#fff', flex: 1, padding: pxToDp(20) }}>
      <StatusBar backgroundColor="transparent" translucent={false} />
      <View>
        <Text style={styles.title}>填写资料</Text>
        <Text style={styles.title}>提升我的魅力</Text>
      </View>
      <View style={{ marginTop: pxToDp(20) }}>
        <View style={{ flexDirection: 'row', width: '60%', alignSelf: 'center', justifyContent: 'space-around' }}>
          <TouchableOpacity activeOpacity={1} onPress={() => setGender(1)} style={{ ...styles.svg, backgroundColor: gender ? 'red' : '#eee' }}>
            <SvgUri
              width="40"
              height="40"
              svgXmlData={male}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} onPress={() => setGender(0)} style={{ ...styles.svg, backgroundColor: !gender ? 'red' : '#eee' }}>
            <SvgUri
              width="40"
              height="40"
              svgXmlData={female}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: pxToDp(20) }}>
        <Input inputStyle={{ fontSize: pxToDp(18) }} value={nickname} onChangeText={setNickname} placeholder="设置名称" />
      </View>
      <View>
        <DatePicker
          androidMode="spinner"
          style={{ width: "100%", fontSize: pxToDp(18) }}
          date={birthday}
          mode="date"
          placeholder="设置生日"
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate={maxDate}
          confirmBtnText="确认"
          cancelBtnText="取消"
          customStyles={{
            dateIcon: {
              display: 'none'
            },
            dateInput: {
              marginLeft: pxToDp(10),
              marginRight: pxToDp(10),
              borderWidth: 0,
              borderBottomWidth: pxToDp(1.1),
              alignItems: "flex-start",
              paddingLeft: pxToDp(4),

            },
            dateText: {
              color: '#000',
              fontSize: pxToDp(18),
            },
            placeholderText: {
              fontSize: pxToDp(18),
              color: '#afafaf'
            }
          }}
          onDateChange={setDate}
        />
      </View>
      <View style={{ marginTop: pxToDp(20) }}>
        <TouchableOpacity onPress={showPicker} activeOpacity={1}>
          <Input disabled={true} inputStyle={{ fontSize: pxToDp(18), color: '#666' }} value={`当前定位：${cityParams.city}`} />
        </TouchableOpacity>
      </View>
      <View>
        <THbutton onPress={changeImg} style={{ height: pxToDp(40), width: '85%', alignSelf: 'center', borderRadius: pxToDp(20) }}>设置头像</THbutton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: { fontSize: pxToDp(20), color: "#666", fontWeight: "bold", marginBottom: pxToDp(5) },
  svg: { width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30), justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }
})