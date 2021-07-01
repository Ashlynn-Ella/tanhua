import React, { useEffect } from 'react';
import { View } from 'react-native';
import Nav from './nav'
import Geo from './src/utils/geo'

function App() {
  useEffect(async ()=>{
    const res = await Geo.getCityByLocation()
    console.log(res)
  },[])
  return (
    <View style={{ flex: 1 }}>
      <Nav></Nav>
    </View>
  );
}

export default App;
