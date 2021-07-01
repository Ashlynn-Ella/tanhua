import React from "react"
import { TouchableOpacity,StyleSheet,Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { pxToDp } from '../../utils/styles-kits'
export const THbutton = ({ style, textStyle,disabled, ...props }) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={props.onPress} style={{width:'100%',height:'100%',overflow:"hidden",...style}} >
      <LinearGradient start={{x:0,y:0}} end={{x:1,y:0}} colors={['#9b63cd', '#e0708c']} style={styles.linearGradient}>
        <Text style={{...styles.buttonText,...textStyle}}>
          {props.children}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    borderRadius: pxToDp(5),
    justifyContent:'center',
    alignContent:'center'
  },
  buttonText: {
    fontSize: pxToDp(18),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});