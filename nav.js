import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/pages/login/index';
import {UserInfo} from './src/pages/user-info/index'
import { TopView } from 'teaset-pro'

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <TopView>
        <Stack.Navigator headerMode="none" initalRouteName="UserInfo">
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </TopView>
    </NavigationContainer>
  );
}

export default Nav;
