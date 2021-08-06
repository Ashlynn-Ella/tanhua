import React from 'react';
import { View, Text } from "react-native";
import JMessage from "jmessage-react-plugin";
class App extends React.Component {
  componentDidMount() {
    JMessage.init({
      'appkey': 'dea245146f8aa468ee93168d',
      'isOpenMessageRoaming': false,
      'isProduction': false,
      'channel': '' 
    })
    JMessage.register({
      username: "登录用户名",
      password: "登录密码"
    }, () => {/*注册成功回调*/}, (error) => {/*注册失败回调*/})
    JMessage.login({
      username: "18665711956",
      password: "18665711956"
    }, (res) => {
      console.log("登录成功");
      console.log(res);
    }, (err) => {
      console.log("登录失败");
      console.log(err);
    })

  }
  render() {
    return (
      <View>
        <Text>goods</Text>
      </View>
    );
  }
}
export default App;