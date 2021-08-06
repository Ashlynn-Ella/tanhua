import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { friend, selectedFriend, group, selectedGroup, message, selectedMessage, my, selectedMy } from './src/res/fonts/iconSvg'
import SvgUri from 'react-native-svg-uri'
import TabNavigator from 'react-native-tab-navigator'
import { Friend } from './src/pages/friend/home/index'
import { Message } from './src/pages/message/home'
import { Group } from './src/pages/group/home'
import { My } from './src/pages/my/home'
import { useMy } from './src/context/my-context'
import { useClinet } from './src/utils/client'
import { MY_INFO } from './src/utils/path-map'
import JMessage from './src/utils/JMessage';

export const Tabbar = () => {
  const [selectedTab, setSelectTab] = useState('group')
  const { setMy } = useMy()
  const { get } = useClinet()
  const page = [
    {
      selected: 'home',
      title: '交友',
      renderIcon: () => <SvgUri width="20" height="20" svgXmlData={friend} />,
      renderSelectedIcon: () => <SvgUri width="20" height="20" svgXmlData={selectedFriend} />,
      onPress: () => setSelectTab('home'),
      component: <Friend />
    },
    {
      selected: 'group',
      title: '圈子',
      renderIcon: () => <SvgUri width="20" height="20" svgXmlData={group} />,
      renderSelectedIcon: () => <SvgUri width="20" height="20" svgXmlData={selectedGroup} />,
      onPress: () => setSelectTab('group'),
      component: <Group />
    },
    {
      selected: 'message',
      title: '信息',
      renderIcon: () => <SvgUri width="20" height="20" svgXmlData={message} />,
      renderSelectedIcon: () => <SvgUri width="20" height="20" svgXmlData={selectedMessage} />,
      onPress: () => setSelectTab('message'),
      component: <Message />
    },
    {
      selected: 'my',
      title: '我的',
      renderIcon: () => <SvgUri width="20" height="20" svgXmlData={my} />,
      renderSelectedIcon: () => <SvgUri width="20" height="20" svgXmlData={selectedMy} />,
      onPress: () => setSelectTab('my'),
      component: <My />
    }
  ]
  useEffect(async () => {
    const res = await get(MY_INFO)
    setMy(res.data)
    await JMessage.login(res.data.guid, res.data.mobile)
  }, [get])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <TabNavigator
      // tabBarStyle={{
      //   backgroundColor: "#eee", justifyContent: "center"
      // }}
      >
        {
          page?.map(item => {
            return (
              <TabNavigator.Item
                key={item.title}
                selected={selectedTab === item.selected}
                title={item.title}
                renderIcon={item.renderIcon}
                renderSelectedIcon={item.renderSelectedIcon}
                onPress={item.onPress}
                selectedTitleStyle={{ color: "#c863b5" }}
              >
                {item.component}
              </TabNavigator.Item>
            )
          })
        }

      </TabNavigator>
    </View>
  )
}