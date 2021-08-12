import React, { useEffect, useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/pages/login/index';
import { UserInfo } from './src/pages/user-info/index'
import { TopView } from 'teaset-pro'
import { useAuth } from './src/context/user-context';
import { Tabbar } from './tabbar'
import { TanHua } from './src/pages/friend/tanhua'
import { Search } from './src/pages/friend/search'
import { TestSoul } from './src/pages/friend/test-soul'
import { TestQA } from './src/pages/friend/test-soul/test-qa/index'
import { TestRes } from './src/pages/friend/test-soul/test-result/index'
import JMessage from './src/utils/JMessage';
import { Detail } from './src/pages/friend/detail';
import { Chat } from './src/pages/message/chat/index'
import { Comment } from './src/pages/group/home/comment/comment';
import { Publish } from './src/pages/group/home/recommend/publish'

const Stack = createStackNavigator();

const Nav = ({ users }) => {
  const { setUser } = useAuth()
  const [initRouteName,] = useState(users.token ? 'Tabbar' : 'Login')
  useEffect(async () => {
    if (users.token) {
      JMessage.init()
      setUser(users)
    }
  }, [users.token])

  return (
    <NavigationContainer>
      <TopView>
        <Stack.Navigator headerMode="none" initialRouteName={initRouteName}>
          <Stack.Screen name="Publish" component={Publish} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="Detail" component={Detail} />
          <Stack.Screen name="TestRes" component={TestRes} />
          <Stack.Screen name="TestQA" component={TestQA} />
          <Stack.Screen name="TestSoul" component={TestSoul} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="TanHua" component={TanHua} />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Tabbar" component={Tabbar} />
        </Stack.Navigator>
      </TopView>
    </NavigationContainer>
  );
}

export default Nav;
