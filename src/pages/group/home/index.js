import React from 'react'
import { View, Text } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { TabBar } from './component/tab-bar'
import { Recommend } from './recommend'
import { Lastest } from './lastest'

export const Group = () => {
  return (
    <ScrollableTabView
      initialPage={1}
      renderTabBar={() => <TabBar />}
    >
      <Recommend tabLabel='推荐' />
      <Lastest tabLabel='最新' />
    </ScrollableTabView>
  )
}