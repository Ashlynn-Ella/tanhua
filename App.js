import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Nav from './nav'
import Geo from './src/utils/geo'
import { Providers } from './src/context/index'
// import { useAuth } from './src/context/user-context';
import AsyncStorage from '@react-native-async-storage/async-storage'

function App() {
  const [isInit, setInit] = useState(false)
  const [users,setUsers] = useState()
  useEffect(async () => { 
    const strUserInfo = await AsyncStorage.getItem('userInfo');
    const userInfo = strUserInfo ? JSON.parse(strUserInfo) : {}
    setUsers(userInfo)
    await Geo.initGeo()
    setInit(true)
  }, [])
  return (
    <View style={{ flex: 1 }}>
      <Providers>
        {isInit ? <Nav users={users} /> : null}
      </Providers>
    </View>
  );
}

export default App;
