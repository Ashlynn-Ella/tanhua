import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, Image, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { pxToDp } from '../../utils/styles-kits'
import { validatePhone } from '../../utils/valid'
import request from '../../utils/http';
import { ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE } from '../../utils/path-map'
import { THbutton } from '../../component/button/index'
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import Toast from '../../utils/Toast'
import { useAuth } from '../../context/user-context';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = (props) => {
  const [showLogin, setShowLogin] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState('18665711978');
  const [isValid, setValid] = useState(true)
  
  const submitEditing = async () => {
    const phoneValid = validatePhone(phoneNumber)
    if (!phoneValid) {
      setValid(phoneValid)
      return
    }
    const res = await request.post(ACCOUNT_LOGIN, { phone: phoneNumber })
    if (res.code == ! '10000') {
      return
    }
    setShowLogin(false)

  }
  return (
    <View>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <Image style={{ width: "100%", height: pxToDp(220) }} source={require('../../res/profileBackground.jpg')} />
      {showLogin ?
        <Login phoneNumber={phoneNumber} isValid={isValid} submitEditing={submitEditing} setPhoneNumber={setPhoneNumber} /> :
        <Code phoneNumber={phoneNumber}{...props} />}
    </View>
  )
}

const Login = ({ phoneNumber, isValid, submitEditing, setPhoneNumber }) => {
  return (
    <View style={{ padding: pxToDp(20) }}>
      <View><Text style={{ color: '#888', fontWeight: "bold", fontSize: pxToDp(25) }}>手机号登录注册</Text></View>
      <Input
        placeholder='请输入手机号码'
        leftIcon={{ type: 'font-awesome', name: 'phone', color: "#ccc", fontSize: pxToDp(20) }}
        maxLength={11}
        keyboardType="phone-pad"
        value={phoneNumber}
        errorMessage={isValid ? '' : '手机号码格式不正确'}
        onChangeText={setPhoneNumber}
        onSubmitEditing={submitEditing}
      />
      <View>
        <THbutton onPress={submitEditing} style={{ width: '85%', height: pxToDp(40), alignSelf: 'center', borderRadius: pxToDp(20) }}>获取验证码</THbutton>
      </View>
    </View>
  )
}
const Code = ({ phoneNumber, ...props }) => {
  const [code, setCode] = useState('')
  const [isCountDowning, setCountDowning] = useState(true)
  const [seconds, setSeconds] = useState(5)
  const { setUser } = useAuth()
  const countDown = () => {
    if (isCountDowning) return
    setCountDowning(true)
    let time = 5
    setSeconds(time)
    let timeId = setInterval(() => {
      time--
      setSeconds(time)
      if (time < 0) {
        clearInterval(timeId)
        setCountDowning(false)
      }
    }, 1000)
  }
  useEffect(() => {
    let time = 5
    let timeId = setInterval(() => {
      time--
      setSeconds(time)
      if (time < 0) {
        clearInterval(timeId)
        setCountDowning(false)
      }
    }, 1000)
  }, [])
  const onCodeSubmitEditing = async () => {
    if (code.length !== 6) {
      Toast.message('验证码不正确', 2000, 'center')
      return
    }
    const res = await request.post(ACCOUNT_VALIDATEVCODE, {
      'phone': phoneNumber,
      'vcode': code
    })
    if (res.code !== '10000') {
      Toast.message(res.message, 2000, 'center')
      return
    }

    try {
      await AsyncStorage.setItem('userInfo', JSON.stringify(
        { mobile: phoneNumber, token: res.data.token, userId: res.data.id }
      ))
    } catch (err) {
      Toast.sad(err, 2000, 'center')
    }

    setUser({
      mobile: phoneNumber,
      token: res.data.token,
      userId: res.data.id
    })
    if (res.data.isNew) {
      props.navigation.navigate('UserInfo')
    } else {
      props.navigation.navigate('Tabbar')
    }
  }
  return (
    <View style={{ padding: pxToDp(20) }}>
      <View><Text style={{ color: '#888', fontWeight: "bold", fontSize: pxToDp(25) }}>输入6位验证码</Text></View>
      <View style={{ marginTop: pxToDp(10) }}><Text style={{ color: "#888" }}>已发到:+86 {phoneNumber}</Text></View>
      <View>
        <CodeField
          value={code}
          onChangeText={setCode}
          onSubmitEditing={onCodeSubmitEditing}
          cellCount={6}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View style={{ marginTop: pxToDp(10) }}>
        <THbutton disabled={isCountDowning} onPress={countDown} style={{ width: '85%', height: pxToDp(40), alignSelf: 'center', borderRadius: pxToDp(20) }}>
          重新获取{isCountDowning ? '(' + seconds + 's)' : null}</THbutton>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: '#7d53ea'
  },
  focusCell: {
    borderColor: '#7d53ea',
  },
});