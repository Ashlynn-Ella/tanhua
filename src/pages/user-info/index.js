import React, { useState, useEffect, useMount } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { pxToDp } from '../../utils/styles-kits'
import SvgUri from 'react-native-svg-uri'
import { male, female } from '../../res/fonts/iconSvg'
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import dayjs from 'dayjs';

export const UserInfo = () => {
  const [gender, setGender] = useState(1)
  const [nickname, setNickname] = useState()
  const [date, setDate] = useState()
  const [city, setCity] = useState()
  const maxDate = dayjs(new Date()).format('YYYY-MM-DD')
  return (
    <View style={{ backgroundColor: '#fff', flex: 1, padding: pxToDp(20) }}>
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
          date={date}
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
        <Input inputStyle={{ fontSize: pxToDp(18), color: '#666' }} value={`当前定位：${city}`} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: { fontSize: pxToDp(20), color: "#666", fontWeight: "bold", marginBottom: pxToDp(5) },
  svg: { width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30), justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }
})